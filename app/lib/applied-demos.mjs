export function forecastDemand(growth) {
  const observed = [100, 120, 110, 140];
  const average = observed.reduce((sum, value) => sum + value, 0) / observed.length;
  const projected = Array.from({ length: 4 }, (_, index) => Math.round(average * (1 + growth / 100 * (index + 1) / 4)));
  const total = projected.reduce((sum, value) => sum + value, 0);
  return { observed, projected, total, stock: 440, reorder: Math.max(total - 440, 0) };
}

export const sampleOrders = [
  { id: "S100", region: "North", units: 18, price: 45 },
  { id: "S101", region: "East", units: 12, price: 80 },
  { id: "S102", region: "West", units: 8, price: 55 },
  { id: "S102", region: "West", units: 8, price: 55 },
  { id: "S103", region: "South", units: null, price: 120 },
  { id: "S104", region: "North", units: 5, price: 120 },
];

export function processOrders() {
  const seen = new Set();
  let duplicates = 0, incomplete = 0;
  const clean = sampleOrders.filter(row => {
    if (seen.has(row.id)) { duplicates++; return false; }
    seen.add(row.id);
    if (row.units === null) { incomplete++; return false; }
    return true;
  });
  const units = clean.reduce((sum, row) => sum + (row.units ?? 0), 0);
  const sales = clean.reduce((sum, row) => sum + (row.units ?? 0) * row.price, 0);
  const csv = ["order_id,region,units,unit_price,line_total", ...clean.map(row => `${row.id},${row.region},${row.units},${row.price},${(row.units ?? 0) * row.price}`)].join("\r\n") + "\r\n";
  return { clean, duplicates, incomplete, units, sales, csv };
}
