export const CATEGORIES = {
  all: { value: undefined, label: "Все" },
  electronics: { value: 0, label: "Электроника" },
  realEstate: { value: 1, label: "Недвижимость" },
  transport: { value: 2, label: "Транспорт" },
  jobs: { value: 3, label: "Работа" },
  services: { value: 4, label: "Услуги" },
  animals: { value: 5, label: "Животные" },
  fashion: { value: 6, label: "Мода" },
  kids: { value: 7, label: "Детское" },
} as const;

export type CategoryValue =
  (typeof CATEGORIES)[keyof typeof CATEGORIES]["value"];
export type CategoryKey = keyof typeof CATEGORIES;

export const CATEGORIES_ARRAY = Object.values(CATEGORIES).map((category) => ({
  id: category.value !== undefined ? String(category.value) : "",
  name: category.label,
  value: category.value,
}));

export const Categories = {
  All: undefined,
  Electronics: 0,
  RealEstate: 1,
  Transport: 2,
  Jobs: 3,
  Services: 4,
  Animals: 5,
  Fashion: 6,
  Kids: 7,
} as const;

export type Categories = (typeof Categories)[keyof typeof Categories];
