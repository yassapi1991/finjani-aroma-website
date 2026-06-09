import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "radial-gradient(circle at 0% 0%, #f1debf 0%, transparent 58%), radial-gradient(circle at 100% 100%, #ecd2b1 0%, transparent 58%), linear-gradient(170deg, #f8f0e3 0%, #f2e2cd 100%)",
          color: "#2f2218",
        }}
      >
        <div style={{ letterSpacing: "0.27em", fontSize: 28, color: "#b76740" }}>FINJANI AROMA</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 84, lineHeight: 1.05 }}>L&apos;Art du Cafe Marocain</div>
          <div style={{ fontSize: 30, color: "#6f5b49" }}>
            Experience premium - modernite, chaleur et raffinement marocain
          </div>
        </div>
        <div style={{ fontSize: 24, letterSpacing: "0.16em", color: "#8e724f" }}>BOUSKOURA, MAROC</div>
      </div>
    ),
    size
  );
}
