import React from 'react';
import {
  ComposedPizza,
  calculatePizzaPrice,
  getPizzaSizeByType,
} from 'services/pizza';
import { usePizzaSizes } from 'data';
import { Topping } from 'gql';
import styled, { css } from 'styled-components';

interface Props {
  toppings: Topping[];
  onPicked: (topping: Topping, index: number) => void;
  isEnabled: boolean;
  pickLabel: string;
}

const Holder = styled.div`
  ${(props: Pick<Props, 'isEnabled'>) => {
    if (!props.isEnabled) {
      return css`
        opacity: 0.3;
        pointer-events: none;
      `;
    }
  }}
`;

export function ToppingPicker({
  toppings,
  onPicked,
  pickLabel,
  isEnabled,
}: Props) {
  return (
    <Holder isEnabled={isEnabled}>
      {toppings.map((topping, index) => {
        return (
          <div key={`${topping.name}-${index}`}>
            <button onClick={() => onPicked(topping, index)}>
              {pickLabel}
            </button>
            {topping.name} (${topping.price.toFixed(2)})
          </div>
        );
      })}
    </Holder>
  );
}
