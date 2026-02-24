# Deploying a New LO Site on Vercel

This guide covers how to spin up a fresh loan officer website from this template on Vercel, connected to the LoanGraphs API.

---

## Prerequisites

- A **LoanGraphs account** with an active LO profile
- Your LO's **LO_ID** (slug) and **API key** from the LoanGraphs dashboard
- A **Vercel account** (free tier is fine for single-LO sites)
- A custom domain (optional, but recommended for SEO)

---

## 1. Fork / Import the Repo

1. Fork `Loan-Graphs/lo-react-template` or click **"Deploy to Vercel"** (coming soon).
2. In Vercel, go to **New Project → Import Git Repository** and select your fork.
3. Choose the **`main`** branch as the production branch.

> **Tip:** If you're managing multiple LOs, create one Vercel project per LO rather than one monorepo with subdomains — each LO's env vars are isolated that way.

---

## 2. Set Environment Variables

In **Vercel → Project → Settings → Environment Variables**, add the following:

| Variable | Value | Required |
|---|---|---|
| `LOANGRAPHS_API_KEY` | Server-side API key from LoanGraphs dashboard | ✅ |
| `LOANGRAPHS_LEADS_API_KEY` | Key for lead forwarding (can match above) | ✅ |
| `LO_ID` | LO slug / ID (e.g. `jsmith-az`) | ✅ |
| `NEXT_PUBLIC_LOANGRAPHS_URL` | `https://loangraphs.com` | ✅ |
| `NEXT_PUBLIC_SITE_URL` | Full URL of this site (e.g. `https://jsmith.loansite.com`) | ✅ |
| `NEXT_PUBLIC_LO_NAME` | Fallback LO name (e.g. `Jane Smith`) | Optional |
| `NEXT_PUBLIC_LO_NMLS` | Fallback NMLS number | Optional |
| `NEXT_PUBLIC_LO_PHONE` | Fallback phone number | Optional |
| `NEXT_PUBLIC_LO_EMAIL` | Fallback email | Optional |
| `NEXT_PUBLIC_LO_STATES` | Comma-separated licensed states (e.g. `AZ,TX,CO`) | Optional |
| `NEXT_PUBLIC_APPLY_URL` | Calendly or apply link | Optional |
| `ANTHROPIC_API_KEY` | Only needed for Phase 6 SEO pipeline | Optional |

> **Environment scope**: Set all variables for **Production**, **Preview**, and **Development** unless otherwise noted. Variables prefixed `NEXT_PUBLIC_` are exposed to the browser.

---

## 3. Configure a Custom Domain (Recommended)

1. In Vercel → **Domains**, add your domain (e.g. `jsmith.revolvemtg.com`).
2. Add the provided DNS records (CNAME or A record) in your DNS provider.
3. Wait for DNS propagation (usually under 1 hour).
4. Vercel provisions a free TLS certificate automatically.

---

## 4. Local Dev Setup

```bash
# 1. Clone the repo
git clone https://github.com/Loan-Graphs/lo-react-template.git
cd lo-react-template

# 2. Install dependencies
pnpm install

# 3. Copy env example
cp .env.example .env.local
# → Fill in .env.local with your LO_ID and API keys

# 4. (Optional) Seed local profile fallback
# Copy your LO's profile JSON to public/lo-profile.json
# This is used when LoanGraphs API is unreachable in development

# 5. Start dev server
pnpm dev
# → http://localhost:3000
```

---

## 5. Local Profile Fallback (`public/lo-profile.json`)

During local development (or if the LoanGraphs API is temporarily unavailable), the site falls back to `public/lo-profile.json`. This file is git-ignored by default; create it from the template:

```jsonc
{
  "name": "Jane Smith",
  "title": "Licensed Mortgage Professional",
  "nmls": "123456",
  "photo": "",
  "company": "Revolve Mortgage",
  "licenseStates": ["AZ", "CO", "TX"],
  "phone": "(602) 555-0100",
  "email": "jane@revolvemtg.com",
  "primaryColor": "#0ea5e9",
  "accentColor": "#f97316",
  "headline": "Your Arizona Mortgage Expert",
  "subheadline": "Helping Arizona families get to the closing table since 2015.",
  "bio": "...",
  "googleRating": 5.0,
  "reviewCount": 47,
  "yearsExperience": 9,
  "plan": "paid",
  "marketDataEnabled": true,
  "seoArticlesEnabled": false,
  "loanProducts": [],
  "testimonials": [],
  "differentiators": []
}
```

---

## 6. Adding a New LO (Multi-Tenant Checklist)

| Step | Action |
|---|---|
| 1 | Create LO profile in LoanGraphs dashboard; note the `LO_ID` |
| 2 | Fork (or duplicate) this repo |
| 3 | Create a new Vercel project pointing at the fork |
| 4 | Set all required env vars (see §2 above) |
| 5 | Add custom domain and DNS records |
| 6 | Trigger a deploy (push to main or use Vercel dashboard) |
| 7 | Verify `/api/leads` is reachable from the live URL |
| 8 | Submit a test lead and confirm it appears in LoanGraphs |

---

## 7. Lead Forwarding Verification

After deploying, test the lead form:

```bash
curl -X POST https://your-lo-domain.com/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "6025550100",
    "loanType": "Purchase",
    "consent": true
  }'
# Expected: {"ok":true}
```

If you receive `{"ok":true}`, the route is live. Check the LoanGraphs dashboard to confirm the lead was recorded.

> **Note:** The LoanGraphs leads endpoint (`POST /{loId}/leads`) is in active development. Until it's live, the route returns `200` for any valid payload and logs errors server-side. Alex will update the client once the endpoint is confirmed.

---

## 8. Redeploying / Updating Template

```bash
# Pull latest template changes into your fork
git remote add upstream https://github.com/Loan-Graphs/lo-react-template.git
git fetch upstream
git merge upstream/main
git push origin main
# → Vercel auto-deploys on push to main
```

---

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| Blank page / "fallback profile" shows | `LO_ID` missing or wrong | Check env var in Vercel |
| Lead form returns 422 | Invalid payload (missing consent or bad email) | Check client-side validation |
| Lead form returns 429 | Rate limit hit (>5 submissions/min per IP) | Wait 60s; use Upstash Redis for prod rate limiting |
| Build fails: `Cannot find module 'zod'` | `node_modules` not installed | Run `pnpm install` |
| Custom domain not working | DNS not propagated | Wait up to 48h; verify CNAME in DNS provider |
