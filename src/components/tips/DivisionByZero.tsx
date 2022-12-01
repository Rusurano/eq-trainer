import { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ErrorContext } from '../contexts/ErrorContext';

const DivisionByZero = () => {
  const { showError3: show, setShowError3: setShow } = useContext(ErrorContext);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Деление на ноль</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Вы видите эту ошибку, поскольку попытались разделить обе части равенства на ноль.
          </p>

          <p>
            Деление на ноль как арифметическое действие <em>не определено</em>, поэтому делить обе части равенства на ноль нельзя.
          </p>

          <p>
            Неопределённость деления на ноль объясняется достаточно просто. По одному из свойств нуля умножение любого числа на ноль даст в результате ноль. Поэтому если делимое отличается от нуля, то не существует числа, которое при умножении на ноль дало бы в результате делимое, а если делимое равно нулю — подойдёт любое число.
          </p>

          <p>
            В этих случаях нарушается определение частного как <em>единственного</em> числа, которое при умножении на делитель даёт в результате делимое: если делимое отличается от нуля, то нарушается требование существования, а если равно нулю — единственности такого числа.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>Хорошо, больше не буду!</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DivisionByZero;