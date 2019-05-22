import { PizzaSizes, Topping, PizzaSize } from 'gql';

export interface ComposedPizza {
  sizeType: PizzaSizes;
  toppings: Topping[];
}

export function convertPizzaSizeEnumToName(size: PizzaSizes) {
  switch (size) {
    case PizzaSizes.Large:
      return 'large';
    case PizzaSizes.Medium:
      return 'medium';
    case PizzaSizes.Small:
      return 'small';
    default:
      return null;
  }
}

export function getPizzaSizeByType(sizesData: PizzaSize[], size: PizzaSizes) {
  return sizesData.find(
    (singleSize) => singleSize.name === convertPizzaSizeEnumToName(size),
  );
}

export function canAddMoreToppingsToPizza(
  { sizeType, toppings }: ComposedPizza,
  sizesData: PizzaSize[],
) {
  const sizeData = getPizzaSizeByType(sizesData, sizeType);

  if (!sizeData) {
    return false;
  }

  if (sizeData.maxToppings === null) {
    return true;
  }

  return toppings.length < sizeData.maxToppings;
}

export function getToppingsForPizzaSize(
  size: PizzaSizes,
  sizesData: PizzaSize[],
) {
  const sizeData = getPizzaSizeByType(sizesData, size);

  return sizeData.toppings;
}

export function calculatePizzaPrice(
  { sizeType, toppings }: ComposedPizza,
  sizesData: PizzaSize[],
) {
  const sizeData = getPizzaSizeByType(sizesData, sizeType);

  if (!sizeData) {
    return null;
  }

  let price = sizeData.basePrice;

  for (const topping of toppings) {
    price += topping.price;
  }

  return price;
}
