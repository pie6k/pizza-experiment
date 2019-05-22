export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ParsableDate: string;
  DateTime: Date;
};

export type PizzaSize = {
  __typename?: 'pizzaSize';
  /** The size of the pizza */
  name: Scalars['String'];
  /** Max number of allowable toppings. */
  maxToppings?: Maybe<Scalars['Int']>;
  /** Toppings allowed on this pizza, and whether or not they're default selected */
  toppings: Array<Maybe<PizzaToppingConnection>>;
  /** Base price of the pie - sans toppings */
  basePrice: Scalars['Float'];
};

export enum PizzaSizes {
  Large = 'LARGE',
  Medium = 'MEDIUM',
  Small = 'SMALL',
}

export type PizzaToppingConnection = {
  __typename?: 'pizzaToppingConnection';
  /** The pizza size */
  pizzaSize: PizzaSize;
  /** The topping */
  topping: Topping;
  /** whether or not this topping should be selected by default for this pizza */
  defaultSelected: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'query';
  /** All available pizza sizes */
  pizzaSizes: Array<Maybe<PizzaSize>>;
  /** Pizza size by name */
  pizzaSizeByName?: Maybe<PizzaSize>;
};

export type QueryPizzaSizeByNameArgs = {
  name?: Maybe<PizzaSizes>;
};

export type Topping = {
  __typename?: 'topping';
  /** The name of the topping */
  name: Scalars['String'];
  /** How much this topping costs */
  price: Scalars['Float'];
};

export type PizzaSizesQueryVariables = {};

export type PizzaSizesQuery = { __typename?: 'query' } & {
  pizzaSizes: Array<
    Maybe<
      { __typename?: 'pizzaSize' } & Pick<
        PizzaSize,
        'name' | 'maxToppings' | 'basePrice'
      > & {
          toppings: Array<
            Maybe<
              { __typename?: 'pizzaToppingConnection' } & Pick<
                PizzaToppingConnection,
                'defaultSelected'
              > & {
                  topping: { __typename?: 'topping' } & Pick<
                    Topping,
                    'name' | 'price'
                  >;
                }
            >
          >;
        }
    >
  >;
};
