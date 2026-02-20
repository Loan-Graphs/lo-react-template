/**
 * Mortgage calculation helpers — TypeScript port of loan-officer-website/utils/mortgageHelpers.js
 */

/** PMI rate table by credit score */
export const PMI_RATE_TABLE = [
  { label: "Excellent (760+)", minScore: 760, pmiRate: 0.25 },
  { label: "Good (740-759)", minScore: 740, pmiRate: 0.39 },
  { label: "Good (720-739)", minScore: 720, pmiRate: 0.39 },
  { label: "Fair (700-719)", minScore: 700, pmiRate: 0.52 },
  { label: "Fair (680-699)", minScore: 680, pmiRate: 0.65 },
  { label: "Below (660-679)", minScore: 660, pmiRate: 0.85 },
  { label: "Below (640-659)", minScore: 640, pmiRate: 1.0 },
  { label: "Poor (<640)", minScore: 0, pmiRate: 1.2 },
];

export interface PMIScoreOption {
  label: string;
  minScore: number;
  pmiRate: number;
}

/**
 * Calculate Down Payment Amount
 */
export function calculateDownPayment(
  homePrice: number,
  downPayment: number,
  type: "%" | "$" = "%"
): number {
  return type === "%" ? homePrice * (downPayment / 100) : downPayment;
}

/**
 * Calculate Loan Amount
 */
export function calculateLoanAmount(homePrice: number, downPayment: number): number {
  return homePrice - downPayment;
}

/**
 * Calculate Monthly Mortgage Payment (Principal & Interest)
 */
export function calculateMonthlyPayment(
  loanAmount: number,
  interestRate: number,
  years: number
): number {
  if (loanAmount <= 0 || interestRate <= 0 || years <= 0) return 0;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = years * 12;
  return loanAmount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -totalMonths)));
}

/**
 * Calculate Monthly PMI
 */
export function calculatePMI(loanAmount: number, pmiRate: number): number {
  if (!pmiRate) return 0;
  return (loanAmount * (pmiRate / 100)) / 12;
}

/**
 * Get PMI Rate from credit score value (0-100 scale matching PMI_RATE_TABLE)
 */
export function getPMIRateFromScore(creditScore: number): number {
  const entry = PMI_RATE_TABLE.find((r) => creditScore >= r.minScore);
  return entry ? entry.pmiRate : 1.2;
}

/**
 * Calculate Monthly Property Tax
 */
export function calculateMonthlyPropertyTax(propertyTax: number): number {
  return propertyTax / 12;
}

/**
 * Calculate Monthly Homeowners Insurance
 */
export function calculateMonthlyInsurance(homeownersInsurance: number): number {
  return homeownersInsurance / 12;
}

/**
 * Calculate Total Monthly Payment
 */
export function calculateTotalMonthlyPayment(
  principalAndInterest: number,
  propertyTax: number,
  insurance: number,
  hoaDues: number,
  pmi: number
): number {
  return principalAndInterest + propertyTax + insurance + hoaDues + pmi;
}

/**
 * Calculate FHA Loan Amount (base + UFMIP rolled in)
 */
export function calculateFhaLoanAmount(
  homePrice: number,
  downPayment: number,
  ufmipRate = 1.75
): number {
  const baseLoanAmount = homePrice - downPayment;
  const upfrontMIP = baseLoanAmount * (ufmipRate / 100);
  return baseLoanAmount + upfrontMIP;
}

/**
 * Calculate USDA Loan Amount
 */
export interface UsdaLoanResult {
  baseLoanAmount: number;
  guaranteeFee: number;
  usdaLoanAmount: number;
}

export function calculateUsdaLoanAmount(
  homePrice: number,
  downPayment: number,
  guaranteeFeeRate = 1
): UsdaLoanResult {
  const baseLoanAmount = homePrice - downPayment;
  const guaranteeFee = baseLoanAmount * (guaranteeFeeRate / 100);
  return {
    baseLoanAmount,
    guaranteeFee,
    usdaLoanAmount: baseLoanAmount + guaranteeFee,
  };
}

/**
 * Calculate USDA Monthly Insurance (annual fee / 12)
 */
export function calculateUsdaMonthlyInsurance(
  usdaLoanAmount: number,
  annualFeeRate = 0.35
): number {
  const annualInsurance = usdaLoanAmount * (annualFeeRate / 100);
  return annualInsurance / 12;
}

/**
 * Calculate VA Loan Amount (base + funding fee)
 */
export interface VaLoanResult {
  baseLoanAmount: number;
  vaFundingFee: number;
  vaLoanAmount: number;
}

export function calculateVaLoanAmount(
  homeValue: number,
  downPayment: number,
  fundingFeeRate: number,
  fundingFeeOption: "first_use" | "after_use" | "exempt" = "first_use"
): VaLoanResult {
  const baseLoanAmount = homeValue - downPayment;
  const vaFundingFee =
    fundingFeeOption === "exempt" ? 0 : baseLoanAmount * (fundingFeeRate / 100);
  const vaLoanAmount = baseLoanAmount + vaFundingFee;
  return { baseLoanAmount, vaFundingFee, vaLoanAmount };
}

/**
 * Calculate LTV ratio (%)
 */
export function calculateLTV(loanAmount: number, homePrice: number): number {
  if (homePrice <= 0) return 0;
  return (loanAmount / homePrice) * 100;
}

/**
 * Calculate break-even point in months for refinance
 */
export function calculateBreakEven(
  refinanceCosts: number,
  monthlySavings: number
): number | null {
  if (monthlySavings <= 0) return null;
  return Math.ceil(refinanceCosts / monthlySavings);
}

/**
 * Format number as USD currency string (no cents)
 */
export function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

/**
 * Format number with commas
 */
export function numberWithCommas(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}
