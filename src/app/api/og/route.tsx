// Edge OG image generator — reads LO info from query params or env vars
// Calling pages pass: ?title=...&subtitle=...&loName=...&loNmls=...&loPhone=...
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Your Loan Officer";
  const subtitle = searchParams.get("subtitle") ?? "Licensed Mortgage Professional";
  const type = searchParams.get("type") ?? "";

  // LO-specific data: passed as query params or from env
  const loName =
    searchParams.get("loName") ??
    process.env.NEXT_PUBLIC_LO_NAME ??
    "Loan Officer";
  const loNmls =
    searchParams.get("loNmls") ??
    process.env.NEXT_PUBLIC_LO_NMLS ??
    "";
  const loPhone =
    searchParams.get("loPhone") ??
    process.env.NEXT_PUBLIC_LO_PHONE ??
    "";
  const loCompany =
    searchParams.get("loCompany") ??
    process.env.NEXT_PUBLIC_LO_COMPANY ??
    "Licensed Mortgage Professional";

  const initials = getInitials(loName);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
          padding: "48px 64px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top row: LO name + NMLS badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                backgroundColor: "#0ea5e9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: "16px",
              }}
            >
              {initials}
            </div>
            <span style={{ color: "#ffffff", fontSize: "18px", fontWeight: 600 }}>
              {loName}
            </span>
          </div>
          {loNmls && (
            <div
              style={{
                backgroundColor: "rgba(14,165,233,0.2)",
                border: "1px solid rgba(14,165,233,0.4)",
                borderRadius: "9999px",
                padding: "6px 16px",
                color: "#38bdf8",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              NMLS #{loNmls}
            </div>
          )}
        </div>

        {/* Center content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div
            style={{
              width: "80px",
              height: "3px",
              backgroundColor: "#0ea5e9",
              borderRadius: "9999px",
              marginBottom: "28px",
            }}
          />
          <div
            style={{
              color: "#ffffff",
              fontSize: title.length > 40 ? "52px" : "64px",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "20px",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: "#d1d5db",
              fontSize: "26px",
              fontWeight: 400,
              lineHeight: 1.4,
              maxWidth: "800px",
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {loPhone && (
              <>
                <span style={{ color: "#38bdf8", fontSize: "14px" }}>📞</span>
                <span style={{ color: "#94a3b8", fontSize: "14px" }}>
                  {loPhone} | {loCompany}
                </span>
              </>
            )}
            {!loPhone && (
              <span style={{ color: "#94a3b8", fontSize: "14px" }}>{loCompany}</span>
            )}
          </div>
          {type && (
            <div
              style={{
                backgroundColor: "#3b82f6",
                borderRadius: "9999px",
                padding: "8px 20px",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {type}
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
