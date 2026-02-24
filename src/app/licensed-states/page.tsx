import type { Metadata } from "next";
import Link from "next/link";
import LicensedStatesMap from "@/components/LicensedStatesMap";
import { getProfile } from "@/lib/profileContext";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    title: `Licensed States | ${profile.name} Mortgage`,
    description: `See which states ${profile.name}${profile.nmls ? ` (NMLS #${profile.nmls})` : ""} is licensed to originate mortgages. Check if they are licensed in your state and get pre-approved today.`,
  };
}

const STATE_NAMES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", DC: "District of Columbia",
  FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois",
  IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana",
  ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan",
  MN: "Minnesota", MS: "Mississippi", MO: "Missouri", MT: "Montana",
  NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota",
  OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
  RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee",
  TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington",
  WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};

export default async function LicensedStatesPage() {
  const profile = await getProfile();
  const states = profile.licenseStates.map((s) => s.toUpperCase());
  const firstName = profile.name.split(" ")[0];

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }}
        className="py-14"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1
            style={{ color: "#ffffff", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800 }}
            className="mb-4"
          >
            Where {firstName} Is Licensed
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "600px" }} className="mx-auto">
            {profile.name} is a licensed mortgage loan officer helping borrowers in{" "}
            {states.length === 1
              ? STATE_NAMES[states[0]] ?? states[0]
              : `${states.length} states`}{" "}
            get the right loan at the best rate.
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "1rem",
              padding: "2rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
          >
            <LicensedStatesMap states={states} brandColor="#3b82f6" />

            {/* Legend */}
            <div className="flex items-center gap-6 mt-4 justify-center">
              <div className="flex items-center gap-2">
                <div style={{ width: 16, height: 16, borderRadius: 3, backgroundColor: "#3b82f6" }} />
                <span style={{ color: "#374151", fontSize: "0.85rem" }}>Licensed</span>
              </div>
              <div className="flex items-center gap-2">
                <div style={{ width: 16, height: 16, borderRadius: 3, backgroundColor: "#e5e7eb" }} />
                <span style={{ color: "#374151", fontSize: "0.85rem" }}>Not currently licensed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* State Pills */}
      <section className="pb-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2
            style={{ color: "#0f172a", fontWeight: 700, fontSize: "1.25rem" }}
            className="mb-5 text-center"
          >
            Licensed in {states.length} State{states.length !== 1 ? "s" : ""}
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {states.sort().map((abbr) => (
              <span
                key={abbr}
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#1d4ed8",
                  border: "1px solid #bfdbfe",
                  borderRadius: "9999px",
                  padding: "6px 18px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                }}
              >
                {abbr} — {STATE_NAMES[abbr] ?? abbr}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0f172a" }} className="py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 style={{ color: "#ffffff", fontWeight: 800, fontSize: "1.75rem" }} className="mb-3">
            Check if {firstName} Is Licensed in Your State
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1rem" }} className="mb-8">
            Don&apos;t see your state listed? {firstName} is actively expanding. Reach out to discuss your
            options or get a referral to a trusted loan officer in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {profile.phone && (
              <a
                href={`tel:${profile.phone.replace(/\D/g, "")}`}
                style={{
                  backgroundColor: "#0ea5e9",
                  color: "#ffffff",
                  padding: "0.875rem 2rem",
                  borderRadius: "0.5rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "1rem",
                }}
                className="hover:opacity-90 transition-opacity"
              >
                Call {profile.phone}
              </a>
            )}
            <Link
              href="/apply"
              style={{
                backgroundColor: "transparent",
                color: "#e2e8f0",
                padding: "0.875rem 2rem",
                borderRadius: "0.5rem",
                fontWeight: 700,
                fontSize: "1rem",
                border: "2px solid #334155",
              }}
              className="hover:bg-white/5 transition-colors"
            >
              Get Pre-Approved →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
