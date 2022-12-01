import { RationalNumber } from "./Number";

export type LinearFunction = {
  k: RationalNumber;
  v: string;
  b: RationalNumber;
}

export type LinearEquation = {
  lhs: LinearFunction;
  rhs: LinearFunction;
}