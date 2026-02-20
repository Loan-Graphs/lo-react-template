"use client";

import { useState } from "react";
import { CheckCircle, Mail } from "lucide-react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, interest: "Newsletter" }),
      });
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex items-center gap-3 text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
        <CheckCircle size={20} />
        <p className="text-sm font-medium">You&#39;re subscribed! Watch your inbox for mortgage tips.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 flex-col sm:flex-row">
      <div className="relative flex-1">
        <Mail
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "0.5rem",
            padding: "0.625rem 0.75rem 0.625rem 2.25rem",
            width: "100%",
            fontSize: "0.875rem",
            outline: "none",
            backgroundColor: "white",
            color: "#0f172a",
          }}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        style={{ backgroundColor: "#0ea5e9", whiteSpace: "nowrap" }}
        className="px-5 py-2.5 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {isSubmitting ? "..." : "Get Mortgage Tips"}
      </button>
    </form>
  );
}
