import React, { useState } from 'react';
import { ComposedPizza, calculatePizzaPrice } from 'services/pizza';

import { PizzaEditor } from './PizzaEditor';
import { PizzaSizes } from 'gql';
import { PizzaSizePicker } from 'ui/pizza/SizePicker';
import { usePizzaSizes } from 'data';
import styled from 'styled-components';

interface Props {
  pizzas: ComposedPizza[];
  onChange: (newPizzas: ComposedPizza[]) => void;
}

const NewPizzaHolder = styled.div`
  margin-bottom: 3em;
`;

const PizzaHolder = styled.div`
  margin-bottom: 1em;
`;

export function PizzaComposer({ pizzas = [], onChange }: Props) {
  const { sizes } = usePizzaSizes();
  function handlePizzaUpdate(index: number, updatedPizza: ComposedPizza) {
    const newData = [...pizzas];
    newData[index] = updatedPizza;

    onChange(newData);
  }

  function addNewPizza(sizeType: PizzaSizes) {
    const newPizza: ComposedPizza = {
      sizeType,
      toppings: [],
    };

    onChange([newPizza, ...pizzas]);
  }

  function removePizza(indexToRemove: number) {
    const newData = pizzas.filter(
      (pizza, pizzaIndex) => pizzaIndex !== indexToRemove,
    );

    onChange(newData);
  }

  const totalPrice = pizzas.reduce((total, anotherPizza) => {
    return total + calculatePizzaPrice(anotherPizza, sizes);
  }, 0);

  console.log(totalPrice);

  return (
    <div>
      <NewPizzaHolder>
        <strong>New Pizza:</strong>
        <PizzaSizePicker onPicked={addNewPizza} />
      </NewPizzaHolder>
      {pizzas.map((pizza, index) => {
        return (
          <PizzaHolder key={index}>
            <PizzaEditor
              pizza={pizza}
              onRemoveRequest={() => removePizza(index)}
              onChange={(changedPizzaData) =>
                handlePizzaUpdate(index, changedPizzaData)
              }
            />
          </PizzaHolder>
        );
      })}
      <div>
        <strong>Total: ${totalPrice.toFixed(2)}</strong>
      </div>
    </div>
  );
}
