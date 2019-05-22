import React from 'react';
import {
  ComposedPizza,
  calculatePizzaPrice,
  canAddMoreToppingsToPizza,
} from 'services/pizza';
import { usePizzaSizes } from 'data';

import { ToppingPicker } from './ToppingPicker';
import { Topping } from 'gql';
import styled from 'styled-components';

interface Props {
  pizza: ComposedPizza;
  onChange: (data: ComposedPizza) => void;
  onRemoveRequest: () => void;
}

const Holder = styled.div`
  border: 1px solid #000;
  padding: 10px;
`;

export function PizzaEditor({ pizza, onChange, onRemoveRequest }: Props) {
  const { sizes, getSize, isLoading } = usePizzaSizes();

  const pizzaSizeData = getSize(pizza.sizeType);
  const price = calculatePizzaPrice(pizza, sizes);

  const canAddTopping = canAddMoreToppingsToPizza(pizza, sizes);

  function handleToppingsChange(newToppings: Topping[]) {
    const newPizza: ComposedPizza = { ...pizza, toppings: newToppings };

    onChange(newPizza);
  }

  function handleToppingPicked(topping: Topping) {
    const newToppings = [...pizza.toppings, topping];
    handleToppingsChange(newToppings);
  }

  function handleToppingRemoved(topping: Topping, indexToRemove: number) {
    const newToppings = pizza.toppings.filter(
      (topping, index) => index !== indexToRemove,
    );
    handleToppingsChange(newToppings);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Holder>
      <strong>Price: ${price.toFixed(2)}</strong>
      <ToppingPicker
        isEnabled
        toppings={pizza.toppings}
        onPicked={handleToppingRemoved}
        pickLabel="-"
      />
      <strong>Add Topping: </strong>
      <ToppingPicker
        isEnabled={canAddTopping}
        toppings={pizzaSizeData.toppings.map(
          (toppingConnection) => toppingConnection.topping,
        )}
        onPicked={handleToppingPicked}
        pickLabel="+"
      />
      <button onClick={onRemoveRequest}>Remove Pizza</button>
    </Holder>
  );
}
