"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

export default function LeadForm({
  title = "Get a Free Consultation",
  subtitle = "Fill out the form and your loan officer will be in touch within 24 hours.",
  compact = false,
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSuccess(true);
      } else {
        setError("Something went wrong. Please try again or call your loan officer.");
      }
    } catch {
      setError("Something went wrong. Please try again or call your loan officer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "0.5rem",
    padding: compact ? "0.5rem 0.75rem" : "0.625rem 0.75rem",
    width: "100%",
    fontSize: "0.875rem",
    outline: "none",
    color: "#0f172a",
  };

  if (isSuccess) {
    return (
      <div
        style={{ backgroundColor: "#f0fdf4", border: "1px solid #86efac", borderRadius: "0.75rem" }}
        className="p-6 text-center"
      >
        <CheckCircle size={40} style={{ color: "#16a34a" }} className="mx-auto mb-3" />
        <h3 style={{ color: "#15803d" }} className="font-bold text-lg mb-1">
          Got it! Your loan officer will be in touch soon.
        </h3>
        <p className="text-sm" style={{ color: "#166534" }}>
          Expect a call or email within 24 hours. You can also reach him directly at{" "}
          <a href={`tel:${(process.env.NEXT_PUBLIC_LO_PHONE ?? "").replace(/\D/g,"")}`} className="font-semibold underline">
            {process.env.NEXT_PUBLIC_LO_PHONE || "your loan officer"}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div>
      {!compact && (
        <div className="mb-5">
          <h3 className="font-bold text-xl" style={{ color: "#0f172a" }}>
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm mt-1" style={{ color: "#64748b" }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="firstName"
              style={{ color: "#374151", fontSize: "0.75rem", fontWeight: 600 }}
              className="block mb-1"
            >
              First Name *
            </label>
            <input
              id="firstName"
              type="text"
              required
              style={inputStyle}
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder="John"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              style={{ color: "#374151", fontSize: "0.75rem", fontWeight: 600 }}
              className="block mb-1"
            >
              Last Name *
            </label>
            <input
              id="lastName"
              type="text"
              required
              style={inputStyle}
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              placeholder="Smith"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            style={{ color: "#374151", fontSize: "0.75rem", fontWeight: 600 }}
            className="block mb-1"
          >
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            required
            style={inputStyle}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            style={{ color: "#374151", fontSize: "0.75rem", fontWeight: 600 }}
            className="block mb-1"
          >
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            required
            style={inputStyle}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(602) 555-0100"
          />
        </div>

        <div>
          <label
            htmlFor="interest"
            style={{ color: "#374151", fontSize: "0.75rem", fontWeight: 600 }}
            className="block mb-1"
          >
            How can I help? *
          </label>
          <select
            id="interest"
            required
            style={{ ...inputStyle, backgroundColor: "#f8fafc" }}
            value={formData.interest}
            onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
          >
            <option value="">Select one...</option>
            <option value="Purchase">Purchase a Home</option>
            <option value="Refinance">Refinance</option>
            <option value="DSCR">DSCR / Investment Loan</option>
            <option value="Pre-Approval">Get Pre-Approved</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {error && (
          <p style={{ color: "#dc2626", fontSize: "0.8rem" }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{ backgroundColor: "#0ea5e9" }}
          className="w-full flex items-center justify-center gap-2 py-3 text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending...
            </>
          ) : (
            "Get Free Consultation"
          )}
        </button>

        <p style={{ color: "#94a3b8", fontSize: "0.7rem" }} className="text-center">
          No spam. Your info is never sold or shared.
        </p>
      </form>
    </div>
  );
}
