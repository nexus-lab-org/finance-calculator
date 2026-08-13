export function formatINR(value, { decimals = 0 } = {}) {
  // Built manually (rather than Intl's `style: "currency"`) so the ₹ glyph
  // sits in the same text run as the digits — some Linux/Chrome font stacks
  // fall back to a different font for the currency symbol otherwise.
  return `₹${formatNumber(value, decimals)}`;
}

export function formatCompactINR(value) {
  const abs = Math.abs(value || 0);
  if (abs >= 1e7) return `₹${(value / 1e7).toFixed(2)} Cr`;
  if (abs >= 1e5) return `₹${(value / 1e5).toFixed(2)} L`;
  if (abs >= 1e3) return `₹${(value / 1e3).toFixed(1)} K`;
  return formatINR(value);
}

export function formatNumber(value, decimals = 0) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value || 0);
}
