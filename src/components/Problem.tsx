import { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { LinearEquation, LinearFunction } from "../types/Equation";
// @ts-ignore
import { InlineMath } from 'react-katex';
import { RationalNumber } from "../types/Number";
import { lineq } from "../core/equationFunctions";
import { rn } from "../core/rationalNumbers";
import { lf } from "../core/linearFunctions";
import Errors from "./tips/Errors";
import { ErrorContext } from "./contexts/ErrorContext";

const Problem = () => {
  // @ts-ignore
  const { setShowError1, setShowError2, setShowError3, setShowError4, setShowError5, setShowError6 } = useContext(ErrorContext);

  const variable: string = 'x';

  const [chosenOp, setChosenOp] = useState<string>('+'),
        [chosenVal, setChosenVal] = useState<string>('');

  const [steps, setSteps] = useState<LinearEquation[]>([]);

  const construct = () => {
    setSteps([lineq.randomize(rn.create(-1, 99, 1), rn.create(1, 99, 1))]);
  }

  const advance = () => {
    const modifier: LinearFunction = lf.parse(chosenVal, variable);
    const modifier_num: RationalNumber = modifier.k.sign === 0 ? modifier.b : modifier.k;

    if(chosenOp === '+') {
      setSteps([...steps, lineq.add(steps[steps.length - 1], modifier)]);
    } else if (chosenOp === '−') {
      setSteps([...steps, lineq.subtract(steps[steps.length - 1], modifier)]);
    } else if (chosenOp === '×') {
      if(modifier_num.numerator === 0) {
        setShowError5(true);
        return
      } else if(modifier.k.sign !== 0) {
        setShowError6(true);
        return
      } else if(modifier_num.numerator === 1) {
        setShowError4(true);
        return
      }
      setSteps([...steps, lineq.multiply(steps[steps.length - 1], modifier_num)]);
    } else if (chosenOp === '÷') {
      if(modifier_num.numerator === 0) {
        setShowError3(true);
        return
      } else if(modifier.k.sign !== 0) {
        setShowError2(true);
        return
      } else if(modifier_num.numerator === 1) {
        setShowError1(true);
        return
      }
      setSteps([...steps, lineq.divide(steps[steps.length - 1], modifier_num)]);
    }

    setChosenVal('');
    setChosenOp('+');
  }

  const inverse = () => {
    setSteps([...steps, lineq.invertSign(steps[steps.length - 1])]);
  }

  const isSolved = () => {
    return lineq.solved(steps[steps.length - 1]);
  }

  const regen = () => {
    construct();
  }

  const isValueValid = ((): boolean => {
    const regexCheck = new RegExp(`^\\d+${variable}?$`);
    return chosenVal.length > 0 && ( chosenVal === variable || regexCheck.test(chosenVal) );
  })();

  useEffect(() => {
    construct();
  },[]);

  return (
    <>
      <Alert variant="warning">
        Чтобы появилось новое уравнение, достаточно обновить страницу.
      </Alert>

      <Container>
        <h1>Тренировщик линейных уравнений</h1>
        { steps.map((step, i) => (
          <Row key={i} className="align-items-center">
            <Col xs={2} lg={2}>
              Шаг {i+1}
            </Col>
            <Col xs={10} lg={6} className="py-3">
              <InlineMath>
                { lineq.tex(step) }
              </InlineMath>
            </Col>
            <Col xs={12} lg={4}>
              { isSolved() && i === (steps.length-1) ?
                <>
                  <strong>Отлично!</strong> Уравнение решено. <Button onClick={regen} variant="danger">Дай ещё</Button>
                </>
                : !isSolved() && i === (steps.length-1) ?
                <>
                  <InputGroup className="mb-3">
                    <Button variant={chosenOp === '+' ? "success" : "info"} onClick={() => setChosenOp('+')}>+</Button>
                    <Button variant={chosenOp === '−' ? "success" : "info"} onClick={() => setChosenOp('−')}>−</Button>
                    <Button variant={chosenOp === '×' ? "success" : "info"} onClick={() => setChosenOp('×')}>×</Button>
                    <Button variant={chosenOp === '÷' ? "success" : "info"} onClick={() => setChosenOp('÷')}>÷</Button>

                    <Form.Control onChange={e => setChosenVal(e.target.value)} aria-label="Введите число" />
                    <Button disabled={!isValueValid} onClick={advance} variant="success">✓</Button>
                    <Button onClick={inverse} variant="primary">× (-1)</Button>
                  </InputGroup>
                </>
              : <></> }
            </Col>
          </Row>
        )) }
      </Container>
      <Errors />
    </>
  )
}

export default Problem;