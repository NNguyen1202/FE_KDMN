export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatMillion = (value: number) => {
  return `${(value / 1000000).toFixed(1)} triệu`;
};