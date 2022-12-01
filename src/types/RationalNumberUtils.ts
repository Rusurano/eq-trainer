import { RationalNumber, NumberSign } from "./Number"

export type RationalNumberUtils = {
  // Constructors
  create: (sign: NumberSign, numerator: number, denominator: number) => RationalNumber;
  randomize: (min: RationalNumber, max: RationalNumber) => RationalNumber;
  // Operations
  invert: (n: RationalNumber) => RationalNumber;
  reduce: (n: RationalNumber) => RationalNumber;
  invertSign: (n: RationalNumber) => RationalNumber;
  // Arithmetic
  add: (m: RationalNumber, n: RationalNumber) => RationalNumber;
  subtract: (m: RationalNumber, n: RationalNumber) => RationalNumber;
  multiply: (m: RationalNumber, n: RationalNumber) => RationalNumber;
  divide: (m: RationalNumber, n: RationalNumber) => RationalNumber;
  // Conditionals
  equal: (m: RationalNumber, n: RationalNumber) => boolean;
  // Display
  tex: (n: RationalNumber, printPlus: boolean, printZero: boolean) => string;
}