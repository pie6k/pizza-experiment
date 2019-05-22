import { createQueryHook } from 'hooks/apollo';
import gql from 'graphql-tag';
import {
  PizzaSizesQuery,
  PizzaSizesQueryVariables,
  PizzaSizes,
  PizzaSize,
} from 'gql';
import { getSafely } from 'services/guard';
import { getPizzaSizeByType } from 'services/pizza';

const [usePizzaSizesRaw] = createQueryHook<
  PizzaSizesQuery,
  PizzaSizesQueryVariables
>(gql`
  query PizzaSizes {
    pizzaSizes {
      name
      maxToppings
      toppings {
        topping {
          name
          price
        }
        defaultSelected
      }
      basePrice
    }
  }
`);

export function usePizzaSizes() {
  const { data, loading } = usePizzaSizesRaw();

  const sizes: PizzaSize[] = getSafely(
    () => data.pizzaSizes,
    [],
  ) as PizzaSize[];

  console.log({ data });

  function getSize(size: PizzaSizes) {
    return getPizzaSizeByType(sizes, size);
  }

  return {
    sizes,
    getSize,
    isLoading: loading,
  };
}
