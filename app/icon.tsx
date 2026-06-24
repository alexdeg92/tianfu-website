import { ImageResponse } from "next/og";
import { getWhiteLogoDataUrl, iconBackground } from "@/app/lib/white-logo";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const src = await getWhiteLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          background: iconBackground,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} height={22} alt="" />
      </div>
    ),
    size,
  );
}
