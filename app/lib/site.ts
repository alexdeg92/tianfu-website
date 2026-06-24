const DEFAULT_SITE_URL = "https://www.tianfu.ca";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL
).replace(/\/$/, "");
