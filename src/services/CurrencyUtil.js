export function formatCurrency(locate, currency, amount) {
  return amount.toLocaleString(locate, {
    style: "currency",
    currency: currency,
  });
}
