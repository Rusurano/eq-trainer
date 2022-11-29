import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { getRandomInt } from "../core";
import { LinearEquation, LinearFunction } from "../types/Equation";

const Problem = () => {
  const variable: string = 'x';

  const [chosenOp, setChosenOp] = useState<string>('+'),
        [chosenVal, setChosenVal] = useState<string>('');

  const [lhs, setLhs] = useState<LinearFunction>(),
        [rhs, setRhs] = useState<LinearFunction>();

  const [steps, setSteps] = useState<LinearEquation[]>([]);

  const checkValidity = () => {

  }

  const construct = (k_min: number, k_max: number, b_min: number, b_max: number) => {
    let k1: number = getRandomInt(k_min, k_max),
        k2: number = getRandomInt(k_min, k_max),
        b1: number = getRandomInt(b_min, b_max),
        b2: number = getRandomInt(b_min, b_max);

    while(k1 === k2)
      k2 = getRandomInt(k_min, k_max);
    
    while(b1 === b2)
      b2 = getRandomInt(b_min, b_max);

    setLhs({ k: k1, b: b1 });
    setRhs({ k: k2, b: b2 });
    setSteps([{ lhs: { k: k1, b: b1 }, rhs: { k: k2, b: b2 } }]);
  }

  const modify = (action: string, target: 'k' | 'b', value: number) => {
    let lhs_new: LinearFunction = lhs!, rhs_new: LinearFunction = rhs!; 

    if(action === '+') {
      lhs_new = { k: (target === 'k') ? lhs!.k + value : lhs!.k, b: (target === 'b') ? lhs!.b + value : lhs!.b };
      rhs_new = { k: (target === 'k') ? rhs!.k + value : rhs!.k, b: (target === 'b') ? rhs!.b + value : rhs!.b };
    } else if(action === '−') {
      lhs_new = { k: (target === 'k') ? lhs!.k - value : lhs!.k, b: (target === 'b') ? lhs!.b - value : lhs!.b };
      rhs_new = { k: (target === 'k') ? rhs!.k - value : rhs!.k, b: (target === 'b') ? rhs!.b - value : rhs!.b };
    } else if(action === '×') {
      lhs_new = { k: (target === 'k') ? lhs!.k * value : lhs!.k, b: (target === 'b') ? lhs!.b * value : lhs!.b };
      rhs_new = { k: (target === 'k') ? rhs!.k * value : rhs!.k, b: (target === 'b') ? rhs!.b * value : rhs!.b };
    } else if(action === '÷') {
      lhs_new = { k: lhs!.k / value, b: lhs!.b / value };
      rhs_new = { k: rhs!.k / value, b: rhs!.b / value };
    }

    setLhs(lhs_new);
    setRhs(rhs_new);
    setSteps(current => [...current, { lhs: lhs_new, rhs: rhs_new }]);
  }

  const printSide = (side: LinearFunction | undefined) => `${side!.k !== 0 ? `${side!.k === 1 ? '' : side!.k === -1 ? '-' : side!.k}${variable}` : ''}${side!.b !== 0 ? ( side!.b < 0 ? side!.b : `${side!.k !== 0 ? '+' : ''}${side!.b}` ) : ''}`;

  const view = (step: LinearEquation) => printSide(step.lhs) + '=' + printSide(step.rhs);

  const advance = () => {
    const value = parseInt(chosenVal.includes(variable) ? chosenVal.substring(0,chosenVal.length-1) : chosenVal);

    modify(chosenOp, chosenVal.includes(variable) ? 'k' : 'b', value);
  }

  const inverse = () => {
    const lhs_new = { k: -lhs!.k, b: -lhs!.b };
    const rhs_new = { k: -rhs!.k, b: -rhs!.b };

    setLhs(lhs_new);
    setRhs(rhs_new);
    setSteps(current => [...current, { lhs: lhs_new, rhs: rhs_new }]);
  }

  const isSolved = () => {
    return rhs!.k === 0 && lhs!.k === 1 && lhs!.b === 0;
  }

  const regen = () => {
    setChosenOp('+');
    setChosenVal('');
    construct(-99,99,-99,99);
  }

  useEffect(() => {
    construct(-99,99,-99,99);
  },[]);

  return (
    <>
      <Alert variant="warning">
        Чтобы появилось новое уравнение, достаточно обновить страницу.
      </Alert>

      <Container>
        <h1>Тренировщик линейных уравнений</h1>
        { steps.map((step, i) => (
          <Row key={i}>
            <Col>
              Шаг {i+1}
            </Col>
            <Col>
              { view(step) }
            </Col>
            <Col>
              { !isSolved() && i === (steps.length-1) ?
                <InputGroup className="mb-3">
                  <DropdownButton
                    variant="outline-secondary"
                    title={chosenOp}
                  >
                    <Dropdown.Item onClick={() => setChosenOp('+')}>+</Dropdown.Item>
                    <Dropdown.Item onClick={() => setChosenOp('−')}>−</Dropdown.Item>
                    <Dropdown.Item onClick={() => setChosenOp('×')}>×</Dropdown.Item>
                    <Dropdown.Item onClick={() => setChosenOp('÷')}>÷</Dropdown.Item>
                  </DropdownButton>
                  <Form.Control onChange={e => setChosenVal(e.target.value)} aria-label="Введите число" />
                </InputGroup>
              : <></> }
            </Col>
            <Col>
              { i === (steps.length-1) ?
                isSolved() ?
                <>
                  <strong>Отлично!</strong> Уравнение решено. <Button onClick={regen} variant="danger">Дай ещё</Button>
                </>
                :
                <>
                  <Button disabled={!(/^\d+x?$/.test(chosenVal))} onClick={advance} variant="success">Применить</Button> или <Button onClick={inverse} variant="primary">× (-1)</Button>
                </>
                : <></> }
            </Col>
          </Row>
        )) }
      </Container>
      
    </>
  )
}

export default Problem;