import { LinearEquation, LinearFunction } from "./types/Equation";

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class cProblem {
  lhs: LinearFunction;
  rhs: LinearFunction;
  variable: string;

  constructor(k_min: number, k_max: number, b_min: number, b_max: number, variable: string = 'x') {
    let k1 = getRandomInt(k_min, k_max),
        k2 = getRandomInt(k_min, k_max),
        b1 = getRandomInt(b_min, b_max),
        b2 = getRandomInt(b_min, b_max);

    while(k1 === k2)
      k2 = getRandomInt(k_min, k_max);
    
    while(b1 === b2)
      b2 = getRandomInt(b_min, b_max);

    this.lhs = { k: k1, b: b1 };
    this.rhs = { k: k2, b: b2 };
    this.variable = variable;
  }

  get solved() {
    // The equation is solved if the left hand side is of the form 'x'
    // and the right hand side is of the form 'b'.
    return this.rhs.k === 0 && this.lhs.k === 1 && this.lhs.b === 0;
  }

  printSide(side: LinearFunction) {
    return `${side.k !== 0 ? `${side.k === 1 ? '' : side.k === -1 ? '-' : side.k}${this.variable}` : ''}${side.b !== 0 ? ( side.b < 0 ? side.b : `+${side.b}` ) : ''}`;
  }

  view() {
    return this.printSide(this.lhs) + '=' + this.printSide(this.rhs);
  }

  modify(action: '+' | '-' | '*' | '/', target: 'k' | 'b', value: number) {
    if(action === '+') {
      this.lhs[target] += value;
      this.rhs[target] += value;
    } else if(action === '-') {
      this.lhs[target] -= value;
      this.rhs[target] -= value;
    } else if(action === '*') {
      this.lhs[target] *= value;
      this.rhs[target] *= value;
    } else if(action === '/') {
      this.lhs[target] /= value;
      this.rhs[target] /= value;
    }
  }
}