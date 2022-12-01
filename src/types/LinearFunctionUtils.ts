import { LinearFunction } from "./Equation";
import { RationalNumber } from "./Number";

export type LinearFunctionUtils = {
  // Constructors
  create: (k: RationalNumber, v: string, b: RationalNumber) => LinearFunction;
  parse: (s: string, v: string) => LinearFunction;
  // Operations
  invertSign: (n: LinearFunction) => LinearFunction;
  // Arithmetic
  add: (m: LinearFunction, n: LinearFunction) => LinearFunction;
  subtract: (m: LinearFunction, n: LinearFunction) => LinearFunction;
  multiply: (m: LinearFunction, n: RationalNumber) => LinearFunction;
  divide: (m: LinearFunction, n: RationalNumber) => LinearFunction;
  // Display
  tex: (n: LinearFunction) => string;
}