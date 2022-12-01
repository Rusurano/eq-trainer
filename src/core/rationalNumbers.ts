import { RationalNumber, NumberSign } from "../types/Number";
import { RationalNumberUtils } from "../types/RationalNumberUtils";
import { gcd, getRandomInt } from "./numericFunctions";

const create = (sign: NumberSign, numerator: number, denominator: number): RationalNumber => ({ sign, numerator, denominator });

const randomize = (min: RationalNumber, max: RationalNumber): RationalNumber => {
  // Find a common denominator.
  let denominator  : number = min.denominator * max.denominator * getRandomInt(1,17),
      min_numerator: number = min.numerator * max.denominator,
      max_numerator: number = max.numerator * min.denominator;
  
  // Determine real upper and lower bounds.
  let lower_bound: number = min.sign * min_numerator,
      upper_bound: number = max.sign * max_numerator;

  if(lower_bound > upper_bound) {
    lower_bound = max.sign * max_numerator,
    upper_bound = min.sign * min_numerator;
  }

  // Randomize the numerator.
  let random_numerator = getRandomInt(lower_bound, upper_bound);

  // The sign of the rational number will be the sign of the generated numerator.
  let random_sign: NumberSign = random_numerator === 0 ? 0 : random_numerator < 0 ? -1 : 1;

  // To prevent negative-valued numerators, take the absolute value.
  random_numerator = Math.abs(random_numerator);

  // If possible, reduce the fraction to the lowest terms.
  return reduce(create(random_sign, random_numerator, denominator));
}

const invert = (n: RationalNumber): RationalNumber => create(n.sign, n.denominator, n.numerator);

const reduce = (n: RationalNumber): RationalNumber => {
  let factor: number = gcd(n.numerator, n.denominator);

  return create(n.sign, n.numerator / factor, n.denominator / factor);
}

const invertSign = (n: RationalNumber): RationalNumber => create(n.sign === 0 ? 0 : n.sign === 1 ? -1 : 1, n.numerator, n.denominator);

const add = (m: RationalNumber, n: RationalNumber): RationalNumber => {
  // Determine the sign of the result.
  let result_sign: NumberSign = 0;

  if(m.sign === n.sign) {
    result_sign = m.sign;
  } else if(m.sign === 0) {
    result_sign = n.sign;
  } else if(n.sign === 0) {
    result_sign = m.sign;
  } else if((m.sign === 1) && (n.sign === -1)) {
    if((m.numerator === n.numerator) && (m.denominator === n.denominator)) {
      result_sign = 0;
    } else {
      result_sign = m.numerator * n.denominator > n.numerator * m.denominator ? 1 : -1;
    }
  } else if((m.sign === -1) && (n.sign === 1)) {
    if((m.numerator === n.numerator) && (m.denominator === n.denominator)) {
      result_sign = 0;
    } else {
      result_sign = m.numerator * n.denominator > n.numerator * m.denominator ? -1 : 1;
    }
  }

  // Find the sum, possibly a reducible fraction.
  let result_numerator  : number = Math.abs(m.sign * m.numerator * n.denominator + n.sign * n.numerator * m.denominator),
      result_denominator: number = m.denominator * n.denominator;

  // If possible, reduce the fraction to the lowest terms.
  return reduce(create(result_sign, result_numerator, result_denominator));
}

const subtract = (m: RationalNumber, n: RationalNumber): RationalNumber => {
  // Subtraction can be interpreted as addition of the subtrahend taken with the opposite sign.
  return add(m, invertSign(n));
}

const multiply = (m: RationalNumber, n: RationalNumber): RationalNumber => {
  // Determine the sign of the result.
  let result_sign: NumberSign = 0;

  if(m.sign === n.sign) {
    result_sign = m.sign;
  } else if((m.sign === 0) || (n.sign === 0)) {
    result_sign = 0;
  } else if(((m.sign === -1) && (n.sign === 1)) || ((m.sign === 1) && (n.sign === -1))) {
    result_sign = -1;
  }

  // Find the product, possibly a reducible fraction.
  let result_numerator  : number = m.numerator * n.numerator,
      result_denominator: number = m.denominator * n.denominator;

  // If possible, reduce the fraction to the lowest terms.
  return reduce(create(result_sign, result_numerator, result_denominator));
}

const divide = (m: RationalNumber, n: RationalNumber): RationalNumber => {
  // Division by a rational number can be interpreted as multiplication by its reciprocal.
  return multiply(m, invert(n));
}

const equal = (m: RationalNumber, n: RationalNumber): boolean => {
  return ( m.sign === n.sign ) && (m.numerator === n.numerator) && (m.denominator === n.denominator);
}

const tex = (n: RationalNumber, printPlus: boolean, printZero: boolean): string => {
  // If the sign is zero, just return zero.
  if(n.sign === 0) return printZero ? '0' : '';
  
  // If the denominator is 1, we render an integer.
  if(n.denominator === 1) return `${n.sign === -1 ? '-' : printPlus ? '+' : ''}${n.numerator}`;

  // The denominator isn't 1, so we render a fraction.
  return `${n.sign === -1 ? '-' : printPlus ? '+' : ''}\\dfrac{${n.numerator}}{${n.denominator}}`;
}

const rn: RationalNumberUtils = {
  create, randomize,
  invert, reduce, invertSign,
  add, subtract, multiply, divide,
  equal,
  tex
}

export { rn };