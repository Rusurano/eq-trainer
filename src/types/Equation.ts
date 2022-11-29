export type LinearFunction = {
  k: number;
  b: number;
}

export type LinearEquation = {
  lhs: LinearFunction;
  rhs: LinearFunction;
}