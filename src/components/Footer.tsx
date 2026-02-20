// Server component — fetches LO profile dynamically
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { getProfile } from "@/lib/profileContext";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default async function Footer() {
  const profile = await getProfile();
  const telHref = `tel:${profile.phone.replace(/\D/g, "")}`;
  const year = new Date().getFullYear();
  const nmls = profile.nmls ? `NMLS# ${profile.nmls}` : "";
  const company = profile.company || "Revolve Mortgage";
  const statesLabel =
    profile.states.length > 0
      ? profile.states.slice(0, 3).join(", ") +
        (profile.states.length > 3 ? " & more" : "")
      : "";

  return (
    <footer style={{ backgroundColor: "#0f172a", color: "#94a3b8" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                style={{ backgroundColor: "#0ea5e9" }}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-bold text-sm">
                  {getInitials(profile.name)}
                </span>
              </div>
              <div>
                <div className="text-white font-bold text-sm">{profile.name}</div>
                <div style={{ color: "#38bdf8" }} className="text-xs">
                  Mortgage Loan Officer
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              {profile.bio
                ? profile.bio.slice(0, 120) + (profile.bio.length > 120 ? "…" : "")
                : `Helping families and investors achieve their real estate goals. ${profile.states.length} state${profile.states.length !== 1 ? "s" : ""} licensed.`}
            </p>
            {nmls && <p className="text-xs">{company} | {nmls}</p>}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/blog", label: "Mortgage Blog" },
                { href: "/resources", label: "Resources" },
                { href: "/apply", label: "Apply Now" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Loan Programs */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Loan Programs</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/loans/conventional", label: "Conventional Loans" },
                { href: "/loans/fha", label: "FHA Loans" },
                { href: "/loans/va", label: "VA Loans" },
                { href: "/loans/jumbo", label: "Jumbo Loans" },
                { href: "/calculators/conventional", label: "Mortgage Calculator" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">
              Contact {profile.name.split(" ")[0]}
            </h3>
            <ul className="space-y-3 text-sm">
              {profile.phone && (
                <li>
                  <a
                    href={telHref}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Phone size={14} />
                    {profile.phone}
                  </a>
                </li>
              )}
              {profile.email && (
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Mail size={14} />
                    {profile.email}
                  </a>
                </li>
              )}
              {statesLabel && (
                <li className="flex items-center gap-2">
                  <MapPin size={14} className="shrink-0" />
                  Licensed in {statesLabel}
                </li>
              )}
            </ul>
            <a
              href={profile.applyUrl === "#" ? "/apply" : profile.applyUrl}
              target={profile.applyUrl.startsWith("http") ? "_blank" : undefined}
              rel={profile.applyUrl.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{ backgroundColor: "#0ea5e9" }}
              className="mt-6 inline-block px-5 py-2.5 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Pre-Approved
            </a>
          </div>
        </div>

        <div
          style={{ borderTopColor: "#1e293b" }}
          className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs"
        >
          <p>
            © {year} {profile.name} | {company}.{" "}
            All rights reserved.{nmls ? ` ${nmls}.` : ""} Equal Housing Lender.
          </p>
          <p className="max-w-md text-right leading-relaxed">
            This is not a commitment to lend. All loans subject to credit approval. Terms and
            conditions apply. Interest rates subject to change.
          </p>
        </div>
      </div>
    </footer>
  );
}
