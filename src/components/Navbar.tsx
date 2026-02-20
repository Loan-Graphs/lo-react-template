// Server component — fetches LO profile and passes to client NavbarClient
import { getProfile } from "@/lib/profileContext";
import NavbarClient from "./NavbarClient";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default async function Navbar() {
  const profile = await getProfile();
  return (
    <NavbarClient
      loName={profile.name}
      loInitials={getInitials(profile.name)}
      loPhone={profile.phone}
      applyUrl={profile.applyUrl === "#" ? "/apply" : profile.applyUrl}
    />
  );
}
