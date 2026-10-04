import { ImageResponse } from "next/og";
import { siteOrigin } from "../seo";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div style={{
      width: "100%", height: "100%", display: "flex", flexDirection: "column",
      padding: "48px 60px", background: "#0d1e19", color: "#eff2e9",
      backgroundImage: "radial-gradient(ellipse at 100% 100%, #294c32, #0d1e19 72%)",
    }}>
      <div style={{ display: "flex", alignItems: "center", paddingBottom: 27, borderBottom: "1px solid #536d49" }}>
        <div style={{ display: "flex", width: 56, height: 56, alignItems: "center", justifyContent: "center", border: "1px solid #d5ef99", borderRadius: 50, color: "#d5ef99", fontSize: 23, marginRight: 20 }}>AO</div>
        <span style={{ fontSize: 30 }}>Almond Owolabi</span>
        <span style={{ marginLeft: "auto", fontSize: 19, color: "#b9ccaf" }}>Data Scientist &amp; AI Engineer</span>
      </div>
      <div style={{ display: "flex", position: "absolute", right: -30, top: 220, opacity: 0.22 }}>
        <svg width="510" height="340" viewBox="0 0 510 340">
          {Array.from({ length: 12 }, (_, row) => <path key={row}
            d={Array.from({ length: 40 }, (_, point) => {
              const x = point * 14;
              const y = 85 + row * 13 + Math.sin(point / 8 + row / 6) * 58;
              return `${point ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
            }).join(" ")}
            stroke="#d5ef99" strokeWidth="1.5" fill="none" />)}
        </svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 64, fontSize: 72, lineHeight: 1.12, letterSpacing: "-4px", fontWeight: 700 }}>
        <span>AI and data systems.</span>
        <span style={{ color: "#d5ef99" }}>Decisions that matter.</span>
      </div>
      <div style={{ display: "flex", marginTop: 25, fontSize: 23, color: "#bdcdb5" }}>
        Dashboards, reporting, and AI for business and social impact.
      </div>
      <div style={{ display: "flex", marginTop: "auto", paddingTop: 25, borderTop: "1px solid #536d49", alignItems: "center", justifyContent: "space-between", fontSize: 18 }}>
        <span style={{ color: "#d5ef99", letterSpacing: "3px" }}>BASED IN NIGERIA · WORKING GLOBALLY</span>
        <span style={{ color: "#bdcdb5" }}>{new URL(siteOrigin).hostname}</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
