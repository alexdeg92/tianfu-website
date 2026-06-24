#!/usr/bin/env node

/**
 * Downloads menu item images from https://www.tianfu.ca
 *
 * Source pages:
 * - Site assets: homepage + images_metadata.json
 * - Menu dish photos: order_online catalog page
 *
 * Usage:
 *   node scripts/fetch-menu-images.mjs           # download missing images
 *   node scripts/fetch-menu-images.mjs --dry-run # report without downloading
 *   node scripts/fetch-menu-images.mjs --force   # re-download existing files
 */

import { mkdir, writeFile, access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  CATEGORY_MAP,
  CATEGORY_ORDER,
  FEATURED_SOURCE_IDS,
  cleanChineseName,
  englishNameForDish,
  CATEGORY_LABELS_FR,
} from "./menu-translations.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const IMAGES_DIR = path.join(REPO_ROOT, "public", "images");
const MENU_DIR = path.join(IMAGES_DIR, "menu");
const CATALOG_PATH = path.join(REPO_ROOT, "app", "data", "menu-catalog.json");
const PLACEHOLDER_IMAGE = "/images/aeb7e8adb2744c5ba3661d2109274aff_1-300x200.webp";

const BASE_URL = "https://www.tianfu.ca";
const ORDER_ONLINE_URL = `${BASE_URL}/index.php?route=product/order_online`;

const SITE_ASSETS = [
  {
    url: `${BASE_URL}/image/flags/home.png`,
    filename: "home.png",
  },
  {
    url: `${BASE_URL}/image/flags/menu.png`,
    filename: "menu.png",
  },
  {
    url: `${BASE_URL}/image/cache/no_background-2560x1000.jpg`,
    filename: "no_background-2560x1000.jpg",
  },
  {
    url: `${BASE_URL}/image/cache/catalog/default/Image_20240309211911-500x311.png`,
    filename: "Image_20240309211911-500x311.png",
  },
  {
    url: `${BASE_URL}/image/cache/catalog/default/aeb7e8adb2744c5ba3661d2109274aff_1-300x200.jpg`,
    filename: "aeb7e8adb2744c5ba3661d2109274aff_1-300x200.jpg",
  },
];

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const force = args.has("--force");

const stats = {
  siteAssetsFound: SITE_ASSETS.length,
  siteAssetsSkipped: 0,
  siteAssetsDownloaded: 0,
  siteAssetsFailed: 0,
  menuItemsFound: 0,
  menuItemsWithImages: 0,
  menuItemsWithoutImages: 0,
  menuImagesSkipped: 0,
  menuImagesDownloaded: 0,
  menuImagesFailed: 0,
  errors: [],
};

async function fileExists(filePath) {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function filenameFromUrl(imageUrl) {
  const parsed = new URL(imageUrl, BASE_URL);
  return path.basename(parsed.pathname);
}

function localPathForMenuImage(imageUrl) {
  return path.join(MENU_DIR, filenameFromUrl(imageUrl));
}

function publicPathForMenuImage(imageUrl) {
  return `/images/menu/${filenameFromUrl(imageUrl)}`;
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "tianfu-website/1.0 (image sync script)",
      Accept: "text/html,application/xhtml+xml",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} fetching ${url}`);
  }

  return response.text();
}

async function downloadFile(url, destPath) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "tianfu-website/1.0 (image sync script)",
      Accept: "image/*,*/*",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} downloading ${url}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(destPath, buffer);
  return buffer.length;
}

function parseMenuDishes(html) {
  const dishes = [];
  const categoryBlocks = html.split(/<div class="dishes-box-cell">/g).slice(1);

  for (const block of categoryBlocks) {
    const categoryMatch = block.match(
      /<div class="dishes-cate-heading">[\s\S]*?<h2>([\s\S]*?)<\/h2>/,
    );
    const categoryZh = categoryMatch ? stripHtml(categoryMatch[1]) : "Unknown";
    const categoryMeta = CATEGORY_MAP[categoryZh] ?? {
      id: "uncategorized",
      label: categoryZh,
    };

    const itemBlocks = block.split(/<li data-id='/g).slice(1);

    for (const itemBlock of itemBlocks) {
      const idMatch = itemBlock.match(/^(\d+)'/);
      const dishId = idMatch ? idMatch[1] : null;

      const nameMatch = itemBlock.match(/<h4 class="dish-name">([\s\S]*?)<\/h4>/);
      const priceMatch = itemBlock.match(/<h6>([\s\S]*?)<\/h6>/);
      const descriptionMatch = itemBlock.match(
        /<div class="dish-des">([\s\S]*?)<\/div>/,
      );
      const imageMatch = itemBlock.match(
        /<div class="dish-image">[\s\S]*?<img src="([^"]+)"/,
      );

      const nameRaw = nameMatch ? stripHtml(nameMatch[1]) : "Unknown dish";
      const nameZh = cleanChineseName(nameRaw);
      const price = priceMatch ? stripHtml(priceMatch[1]) : "";
      const description = descriptionMatch ? stripHtml(descriptionMatch[1]) : "";
      const spicy = Boolean(nameMatch && /spicy\.png/.test(nameMatch[1]));
      const imageUrl = imageMatch
        ? new URL(imageMatch[1], BASE_URL).href
        : null;
      const publicPath = imageUrl ? publicPathForMenuImage(imageUrl) : null;

      dishes.push({
        id: dishId ? `dish-${dishId}` : `dish-unknown-${dishes.length + 1}`,
        sourceId: dishId,
        categoryId: categoryMeta.id,
        categoryZh,
        category: categoryMeta.label,
        name: englishNameForDish(dishId, nameRaw),
        nameZh,
        nameRaw,
        price,
        description,
        spicy,
        spice: spicy ? 3 : 0,
        imageUrl,
        image: publicPath ?? PLACEHOLDER_IMAGE,
        publicPath,
        featured: dishId ? FEATURED_SOURCE_IDS.has(dishId) : false,
        localPath: imageUrl ? localPathForMenuImage(imageUrl) : null,
      });
    }
  }

  return dishes;
}

function buildMenuCatalog(dishes) {
  const categories = CATEGORY_ORDER.map((id) => {
    const dish = dishes.find((entry) => entry.categoryId === id);
    return {
      id,
      label: dish?.category ?? id,
      labelZh: dish?.categoryZh ?? id,
    };
  }).filter((category, index, list) => {
    return dishes.some((dish) => dish.categoryId === category.id) ||
      list.findIndex((entry) => entry.id === category.id) === index;
  });

  const seenCategoryIds = new Set();
  const orderedCategories = [];
  for (const dish of dishes) {
    if (!seenCategoryIds.has(dish.categoryId)) {
      seenCategoryIds.add(dish.categoryId);
      orderedCategories.push({
        id: dish.categoryId,
        label: dish.category,
        labelZh: dish.categoryZh,
      });
    }
  }

  return {
    source: ORDER_ONLINE_URL,
    fetchedAt: new Date().toISOString(),
    placeholderImage: PLACEHOLDER_IMAGE,
    categories: orderedCategories,
    items: dishes.map(
      ({
        id,
        sourceId,
        categoryId,
        category,
        categoryZh,
        name,
        nameZh,
        nameRaw,
        price,
        description,
        spice,
        spicy,
        image,
        publicPath,
        featured,
      }) => ({
        id,
        sourceId,
        categoryId,
        category,
        categoryZh,
        name,
        nameZh,
        nameRaw,
        price,
        description,
        spice,
        spicy,
        image,
        publicPath,
        featured: featured || undefined,
      }),
    ),
  };
}

async function writeMenuCatalog(dishes) {
  const catalog = buildMenuCatalog(dishes);
  if (!dryRun) {
    await mkdir(path.dirname(CATALOG_PATH), { recursive: true });
    await writeFile(CATALOG_PATH, `${JSON.stringify(catalog, null, 2)}\n`);
    console.log(`\nWrote catalog: ${path.relative(REPO_ROOT, CATALOG_PATH)}`);
  }
  return catalog;
}

async function syncSiteAssets() {
  console.log("\nSite assets (public/images/):");

  for (const asset of SITE_ASSETS) {
    const destPath = path.join(IMAGES_DIR, asset.filename);

    if (!force && (await fileExists(destPath))) {
      stats.siteAssetsSkipped += 1;
      console.log(`  skip  ${asset.filename} (already exists)`);
      continue;
    }

    if (dryRun) {
      console.log(`  would download ${asset.filename} <- ${asset.url}`);
      continue;
    }

    try {
      const bytes = await downloadFile(asset.url, destPath);
      stats.siteAssetsDownloaded += 1;
      console.log(`  saved ${asset.filename} (${bytes} bytes)`);
    } catch (error) {
      stats.siteAssetsFailed += 1;
      const message = `${asset.filename}: ${error.message}`;
      stats.errors.push(message);
      console.error(`  fail  ${message}`);
    }
  }
}

async function syncMenuImages(dishes) {
  console.log("\nMenu dish images (public/images/menu/):");

  const manifest = {
    source: ORDER_ONLINE_URL,
    fetchedAt: new Date().toISOString(),
    dishes: [],
  };

  for (const dish of dishes) {
    stats.menuItemsFound += 1;

    const entry = {
      id: dish.id,
      sourceId: dish.sourceId,
      categoryId: dish.categoryId,
      category: dish.category,
      categoryZh: dish.categoryZh,
      name: dish.name,
      nameZh: dish.nameZh,
      price: dish.price,
      imageUrl: dish.imageUrl,
      publicPath: dish.publicPath,
      filename: dish.imageUrl ? filenameFromUrl(dish.imageUrl) : null,
    };

    manifest.dishes.push(entry);

    if (!dish.imageUrl) {
      stats.menuItemsWithoutImages += 1;
      continue;
    }

    stats.menuItemsWithImages += 1;

    if (!force && (await fileExists(dish.localPath))) {
      stats.menuImagesSkipped += 1;
      continue;
    }

    if (dryRun) {
      console.log(`  would download ${entry.filename} (${dish.name})`);
      continue;
    }

    try {
      const bytes = await downloadFile(dish.imageUrl, dish.localPath);
      stats.menuImagesDownloaded += 1;
      console.log(`  saved ${entry.filename} (${bytes} bytes) — ${dish.name}`);
    } catch (error) {
      stats.menuImagesFailed += 1;
      const message = `${entry.filename} (${dish.name}): ${error.message}`;
      stats.errors.push(message);
      console.error(`  fail  ${message}`);
    }
  }

  if (!dryRun) {
    const manifestPath = path.join(MENU_DIR, "manifest.json");
    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    console.log(`\nWrote manifest: ${path.relative(REPO_ROOT, manifestPath)}`);
  }

  return manifest;
}

async function syncMenuDictionaries(catalog) {
  if (dryRun) return;

  const dictionaryFiles = {
    en: path.join(REPO_ROOT, "i18n", "dictionaries", "en.json"),
    fr: path.join(REPO_ROOT, "i18n", "dictionaries", "fr.json"),
    zh: path.join(REPO_ROOT, "i18n", "dictionaries", "zh.json"),
  };

  const enCategories = Object.fromEntries(
    catalog.categories.map((category) => [category.id, category.label]),
  );
  const frCategories = Object.fromEntries(
    catalog.categories.map((category) => [
      category.id,
      CATEGORY_LABELS_FR[category.id] ?? category.label,
    ]),
  );
  const zhCategories = Object.fromEntries(
    catalog.categories.map((category) => [category.id, category.labelZh]),
  );

  const enItems = {};
  const zhItems = {};
  for (const item of catalog.items) {
    enItems[item.id] = {
      name: item.name,
      description: item.description || "",
    };
    zhItems[item.id] = {
      name: item.nameZh,
      description: item.description || "",
    };
  }

  for (const [locale, filePath] of Object.entries(dictionaryFiles)) {
    const dictionary = JSON.parse(await readFile(filePath, "utf8"));
    dictionary.menu.categories =
      locale === "fr"
        ? frCategories
        : locale === "zh"
          ? zhCategories
          : enCategories;
    dictionary.menu.items =
      locale === "zh"
        ? zhItems
        : { ...dictionary.menu.items, ...enItems };
    await writeFile(filePath, `${JSON.stringify(dictionary, null, 2)}\n`);
    console.log(`Updated dictionary: ${path.relative(REPO_ROOT, filePath)}`);
  }
}

async function updateImagesMetadata() {
  const metadataPath = path.join(IMAGES_DIR, "images_metadata.json");
  const metadata = SITE_ASSETS.map((asset) => ({
    url: asset.url,
    filename: asset.filename,
    saved_to: path.join(IMAGES_DIR, asset.filename),
  }));

  if (!dryRun) {
    await writeFile(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`);
  }
}

function printSummary() {
  console.log("\n--- Summary ---");
  console.log(`Source website: ${BASE_URL}`);
  console.log(`Menu page:      ${ORDER_ONLINE_URL}`);
  console.log(`Mode:           ${dryRun ? "dry-run" : force ? "force re-download" : "download missing"}`);
  console.log("");
  console.log(`Site assets:    ${stats.siteAssetsFound} known, ${stats.siteAssetsSkipped} skipped, ${stats.siteAssetsDownloaded} downloaded, ${stats.siteAssetsFailed} failed`);
  console.log(`Menu items:     ${stats.menuItemsFound} found on source site`);
  console.log(`  with images:  ${stats.menuItemsWithImages}`);
  console.log(`  no image:     ${stats.menuItemsWithoutImages} (not on source site)`);
  console.log(`Menu images:    ${stats.menuImagesSkipped} skipped, ${stats.menuImagesDownloaded} downloaded, ${stats.menuImagesFailed} failed`);

  if (stats.errors.length > 0) {
    console.log(`\nErrors (${stats.errors.length}):`);
    for (const error of stats.errors) {
      console.log(`  - ${error}`);
    }
  }

  if (dryRun) {
    const wouldDownload =
      stats.siteAssetsFound -
      stats.siteAssetsSkipped +
      stats.menuItemsWithImages -
      stats.menuImagesSkipped;
    console.log(`\nDry-run: would download up to ${wouldDownload} files.`);
  }
}

async function main() {
  console.log(`Fetching menu catalog from ${ORDER_ONLINE_URL}`);

  await mkdir(IMAGES_DIR, { recursive: true });
  await mkdir(MENU_DIR, { recursive: true });

  const html = await fetchText(ORDER_ONLINE_URL);
  const dishes = parseMenuDishes(html);

  if (dishes.length === 0) {
    throw new Error(
      "No menu dishes parsed. The source page structure may have changed.",
    );
  }

  await syncSiteAssets();
  await syncMenuImages(dishes);
  const catalog = await writeMenuCatalog(dishes);
  await syncMenuDictionaries(catalog);
  await updateImagesMetadata();
  printSummary();

  if (stats.siteAssetsFailed > 0 || stats.menuImagesFailed > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(`\nFatal: ${error.message}`);
  process.exit(1);
});
