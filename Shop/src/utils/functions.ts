export const VNDCurrency = (money: number) => {
  const config = { style: "currency", currency: "VND", maximumFractionDigits: 9 };
  return new Intl.NumberFormat("vi-VN", config).format(money);
};

interface Stock {
  id: number;
  createdOn: string;
  lastUpdatedOn: string;
  totalStock: number;
  availableStock: number;
  new: boolean;
}

interface ProductItem {
  id: number;
  createdOn: string;
  lastUpdatedOn: string;
  price: number;
  imageUrl: string | null;
  availableStock: number;
  variationCombination: string;
  stock: Stock;
  productId: number;
  new: boolean;
}

export function processProductItems(data: ProductItem[]): {
  combinationMap: Record<string, string[]>,
  sizes: string[],
  colors: string[]
} {
  const combinationMap: Record<string, string[]> = {};
  data.forEach(item => {
    const [size, color] = item.variationCombination.split(":");
    if (!combinationMap[size]) {
      combinationMap[size] = [];
    }
    if (!combinationMap[size].includes(color)) {
      combinationMap[size].push(color);
    }
  });

  const sizes = Object.keys(combinationMap);
  const colors = Array.from(new Set(Object.values(combinationMap).flat()));

  return { combinationMap, sizes, colors };
}