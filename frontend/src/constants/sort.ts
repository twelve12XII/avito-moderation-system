export const SORT_OPTIONS = {
  createdAt: { value: "createdAt", label: "По дате создания" },
  price: { value: "price", label: "По цене" },
  priority: { value: "priority", label: "По приоритету" },
} as const;

export const SORT_ORDER_OPTIONS = {
  asc: { value: "asc", label: "По возрастанию" },
  desc: { value: "desc", label: "По убыванию" },
} as const;
