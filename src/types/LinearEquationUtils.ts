import { LinearFunction, LinearEquation } from "./Equation";
import { RationalNumber } from "./Number";

export type LinearEquationUtils = {
  // Constructors
  create: (lhs: LinearFunction, rhs: LinearFunction) => LinearEquation;
  randomize: (min: RationalNumber, max: RationalNumber) => LinearEquation;
  // Operations
  invertSign: (n: LinearEquation) => LinearEquation;
  // Arithmetic
  add: (m: LinearEquation, n: LinearFunction) => LinearEquation;
  subtract: (m: LinearEquation, n: LinearFunction) => LinearEquation;
  multiply: (m: LinearEquation, n: RationalNumber) => LinearEquation;
  divide: (m: LinearEquation, n: RationalNumber) => LinearEquation;
  // Conditionals
  solved: (n: LinearEquation) => boolean;
  // Display
  tex: (n: LinearEquation) => string;
}