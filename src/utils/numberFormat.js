import numeral from "numeral";

export function formatCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? "$0,0" : "$0,0.00");
}

export function formatPercent(number) {
  return numeral(number / 100).format("0.0%");
}

export function formatNumber(number) {
  return numeral(number).format();
}

export function formatShortenNumber(number) {
  return numeral(number).format("0.00a").replace(".00", "");
}

export function formatData(number) {
  return numeral(number).format("0.0 b");
}
