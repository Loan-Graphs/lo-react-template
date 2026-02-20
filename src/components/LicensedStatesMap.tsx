"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// FIPS code to state abbreviation mapping
const FIPS_TO_ABBR: Record<string, string> = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA",
  "08": "CO", "09": "CT", "10": "DE", "11": "DC", "12": "FL",
  "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN",
  "19": "IA", "20": "KS", "21": "KY", "22": "LA", "23": "ME",
  "24": "MD", "25": "MA", "26": "MI", "27": "MN", "28": "MS",
  "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH",
  "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND",
  "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI",
  "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT",
  "50": "VT", "51": "VA", "53": "WA", "54": "WV", "55": "WI",
  "56": "WY",
};

const ABBR_TO_NAME: Record<string, string> = {
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

interface Props {
  states: string[];
  brandColor?: string;
}

interface TooltipState {
  name: string;
  abbr: string;
  licensed: boolean;
  x: number;
  y: number;
}

export default function LicensedStatesMap({ states, brandColor = "#3b82f6" }: Props) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const licensedSet = new Set(states.map((s) => s.toUpperCase()));

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <ComposableMap
        projection="geoAlbersUsa"
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const fips = geo.id?.toString().padStart(2, "0") ?? "";
              const abbr = FIPS_TO_ABBR[fips] ?? "";
              const licensed = licensedSet.has(abbr);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={licensed ? brandColor : "#e5e7eb"}
                  stroke="#ffffff"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none", cursor: "pointer" },
                    hover: {
                      fill: licensed ? "#2563eb" : "#d1d5db",
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: { outline: "none" },
                  }}
                  onMouseEnter={(e) => {
                    const name = ABBR_TO_NAME[abbr] ?? abbr;
                    const rect = (e.target as SVGElement)
                      .closest("svg")
                      ?.getBoundingClientRect();
                    const svgX = rect ? e.clientX - rect.left : e.clientX;
                    const svgY = rect ? e.clientY - rect.top : e.clientY;
                    setTooltip({ name, abbr, licensed, x: svgX, y: svgY });
                  }}
                  onMouseMove={(e) => {
                    const rect = (e.target as SVGElement)
                      .closest("svg")
                      ?.getBoundingClientRect();
                    const svgX = rect ? e.clientX - rect.left : e.clientX;
                    const svgY = rect ? e.clientY - rect.top : e.clientY;
                    setTooltip((prev) =>
                      prev ? { ...prev, x: svgX, y: svgY } : prev
                    );
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: "absolute",
            left: tooltip.x + 12,
            top: tooltip.y - 36,
            backgroundColor: "#0f172a",
            border: "1px solid #334155",
            borderRadius: "6px",
            padding: "6px 12px",
            pointerEvents: "none",
            zIndex: 10,
            fontSize: "13px",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: "#e2e8f0", fontWeight: 600 }}>
            {tooltip.abbr} — {tooltip.name}
          </span>
          <span
            style={{
              marginLeft: "8px",
              color: tooltip.licensed ? brandColor : "#64748b",
              fontSize: "11px",
            }}
          >
            {tooltip.licensed ? "✓ Licensed" : "Not licensed"}
          </span>
        </div>
      )}
    </div>
  );
}
