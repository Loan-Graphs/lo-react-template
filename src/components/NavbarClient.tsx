"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/calculators/conventional", label: "Calculators" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
  { href: "/licensed-states", label: "Licensed States" },
  { href: "/contact", label: "Contact" },
];

interface NavbarProps {
  loName: string;
  loInitials: string;
  loPhone: string;
  applyUrl: string;
}

export default function NavbarClient({
  loName,
  loInitials,
  loPhone,
  applyUrl,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Format phone for tel: link (strip non-digits)
  const telHref = `tel:${loPhone.replace(/\D/g, "")}`;

  return (
    <header style={{ backgroundColor: "#0f172a" }} className="sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div
              style={{ backgroundColor: "#0ea5e9" }}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-sm">{loInitials}</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight">{loName}</div>
              <div style={{ color: "#38bdf8" }} className="text-xs leading-tight">
                Mortgage Loan Officer
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {loPhone && (
              <a
                href={telHref}
                className="flex items-center gap-1.5 text-gray-300 hover:text-white text-sm transition-colors"
              >
                <Phone size={14} />
                <span>{loPhone}</span>
              </a>
            )}
            <a
              href={applyUrl}
              target={applyUrl.startsWith("http") ? "_blank" : undefined}
              rel={applyUrl.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{ backgroundColor: "#0ea5e9" }}
              className="px-4 py-2 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Pre-Approved
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div style={{ borderTopColor: "#334155" }} className="md:hidden border-t pb-4">
            <nav className="flex flex-col gap-1 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white px-2 py-2 text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2 px-2">
              {loPhone && (
                <a
                  href={telHref}
                  className="flex items-center gap-2 text-gray-300 text-sm py-2"
                >
                  <Phone size={14} />
                  {loPhone}
                </a>
              )}
              <a
                href={applyUrl}
                target={applyUrl.startsWith("http") ? "_blank" : undefined}
                rel={applyUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{ backgroundColor: "#0ea5e9" }}
                className="text-center px-4 py-2 text-white text-sm font-semibold rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Get Pre-Approved
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
