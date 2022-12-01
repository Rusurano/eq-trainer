import { LinearFunction } from "../types/Equation";
import { LinearFunctionUtils } from "../types/LinearFunctionUtils";
import { NumberSign, RationalNumber } from "../types/Number";
import { rn } from "./rationalNumbers";

const create = (k: RationalNumber, v: string, b: RationalNumber): LinearFunction => {
  return { k, v, b };
}

const parse = (s: string, v: string): LinearFunction => {
  // Parses a monomial into a linear function.
  let result_sign: NumberSign = 1,
      result_k: RationalNumber = rn.create(0,0,1),
      result_b: RationalNumber = rn.create(0,0,1),
      parsed_s: string = s;

  if(s.includes(v)) {
    // If s includes a variable, we interpret this as k.
    // Moreover, if the s is just a variable, we interpret this as k = 1.
    parsed_s = s === v ? '1' : parsed_s.substring(0, parsed_s.length - v.length);
    result_sign = parseInt(parsed_s) === 0 ? 0 : result_sign;
    result_k = rn.create(result_sign, parseInt(parsed_s), 1);
  } else {
    result_b = rn.create(result_sign, parseInt(parsed_s), 1);
    result_sign = parseInt(parsed_s) === 0 ? 0 : result_sign;
  }

  return create(result_k, v, result_b);
}

const invertSign = (n: LinearFunction): LinearFunction => {
  return create(rn.invertSign(n.k), n.v, rn.invertSign(n.b));
}

const add = (m: LinearFunction, n: LinearFunction): LinearFunction => {
  // The sum of two linear functions is a linear function.
  let result_k = rn.add(m.k, n.k),
      result_b = rn.add(m.b, n.b);

  return create(result_k, m.v, result_b);
}

const subtract = (m: LinearFunction, n: LinearFunction): LinearFunction => {
  // Subtraction can be interpreted as addition of the subtrahend taken with the opposite sign.
  return add(m, invertSign(n));
}

const multiply = (m: LinearFunction, n: RationalNumber): LinearFunction => {
  // The product of a linear function and a number is a linear function.
  let result_k = rn.multiply(m.k, n),
      result_b = rn.multiply(m.b, n);

  return create(result_k, m.v, result_b);
}

const divide = (m: LinearFunction, n: RationalNumber): LinearFunction => {
  // The quotient of a linear function and a number is a linear function.
  let result_k = rn.divide(m.k, n),
      result_b = rn.divide(m.b, n);

  return create(result_k, m.v, result_b);
}

const tex = (n: LinearFunction): string => {
  let tex_k = rn.tex(n.k, false, false),
      tex_b = rn.tex(n.b, n.k.sign !== 0, true);

  let tex_kx = n.k.sign === 0 ? '' : ( n.k.numerator === 1 && n.k.denominator === 1 ) ? `${n.k.sign === -1 ? '-' : ''}${n.v}` : `${tex_k}${n.v}`;
  tex_b = n.b.sign === 0 ? ( n.k.sign === 0 ? '0' : '' ) : tex_b;

  return `${tex_kx}${tex_b}`;
}

const lf: LinearFunctionUtils = {
  create, parse,
  invertSign,
  add, subtract, multiply, divide,
  tex
}

export { lf };