import React from 'react';
import { PizzaSizes } from 'gql';

interface Props {
  onPicked: (size: PizzaSizes) => void;
}

export function PizzaSizePicker({ onPicked }: Props) {
  return (
    <div>
      <button onClick={() => onPicked(PizzaSizes.Small)}>Small</button>
      <button onClick={() => onPicked(PizzaSizes.Medium)}>Medium</button>
      <button onClick={() => onPicked(PizzaSizes.Large)}>Large</button>
    </div>
  );
}
