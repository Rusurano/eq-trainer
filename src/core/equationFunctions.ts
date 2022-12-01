import { LinearEquation, LinearFunction } from "../types/Equation";
import { LinearEquationUtils } from "../types/LinearEquationUtils";
import { RationalNumber } from "../types/Number";
import { lf } from "./linearFunctions";
import { rn } from "./rationalNumbers";

const create = (lhs: LinearFunction, rhs: LinearFunction): LinearEquation => ({ lhs, rhs });

const randomize = (min: RationalNumber, max: RationalNumber): LinearEquation => {
  // Randomize the initial coefficients.
  let left_k : RationalNumber = rn.randomize(min, max),
      left_b : RationalNumber = rn.randomize(min, max),
      right_k: RationalNumber = rn.randomize(min, max),
      right_b: RationalNumber = rn.randomize(min, max);

  // Ensure that all coefficients are different so they won't cancel out.
  while(rn.equal(left_k, right_k))
    right_k = rn.randomize(min, max);
  
  while(rn.equal(left_b, right_b))
    right_b = rn.randomize(min, max);

  // Produce the equation.
  let random_lhs: LinearFunction = lf.create(left_k, 'x', left_b),
      random_rhs: LinearFunction = lf.create(right_k, 'x', right_b);

  return create(random_lhs, random_rhs);
}

const invertSign = (n: LinearEquation): LinearEquation => {
  let result_lhs: LinearFunction = lf.invertSign(n.lhs),
      result_rhs: LinearFunction = lf.invertSign(n.rhs);

  return create(result_lhs, result_rhs);
}

const add = (m: LinearEquation, n: LinearFunction): LinearEquation => {
  // Addition of a linear function to both sides of a linear equation.
  let result_lhs: LinearFunction = lf.add(m.lhs, n),
      result_rhs: LinearFunction = lf.add(m.rhs, n);

  return create(result_lhs, result_rhs);
}

const subtract = (m: LinearEquation, n: LinearFunction): LinearEquation => {
  // Subtraction of a linear function from both sids of a linear equation.
  return add(m, lf.invertSign(n));
}

const multiply = (m: LinearEquation, n: RationalNumber): LinearEquation => {
  // Multiplication of a linear equation on a rational number.
  let result_lhs: LinearFunction = lf.multiply(m.lhs, n),
      result_rhs: LinearFunction = lf.multiply(m.rhs, n);

  return create(result_lhs, result_rhs);
}

const divide = (m: LinearEquation, n: RationalNumber): LinearEquation => {
  // Division of a linear equation on a rational number.
  let result_lhs: LinearFunction = lf.divide(m.lhs, n),
      result_rhs: LinearFunction = lf.divide(m.rhs, n);

  return create(result_lhs, result_rhs);
}

const tex = (n: LinearEquation): string => {
  return `${lf.tex(n.lhs)}=${lf.tex(n.rhs)}`;
}

const solved = (n: LinearEquation): boolean => {
  return n.lhs.k.sign === 1 && n.lhs.k.numerator === 1 && n.lhs.k.denominator === 1 && n.lhs.b.sign === 0 && n.rhs.k.sign === 0;
}

const lineq: LinearEquationUtils = {
  create, randomize,
  invertSign,
  add, subtract, multiply, divide,
  solved,
  tex
}

export { lineq };