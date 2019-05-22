import React, { useState } from 'react';

import { RootStyles } from './ui';

import { PizzaComposer } from './views/PizzaComposer';
import { ComposedPizza } from 'services/pizza';

export function App() {
  const [pizzas, setPizzas] = useState<ComposedPizza[]>([]);

  return (
    <>
      <RootStyles />
      <PizzaComposer pizzas={pizzas} onChange={setPizzas} />
    </>
  );
}
