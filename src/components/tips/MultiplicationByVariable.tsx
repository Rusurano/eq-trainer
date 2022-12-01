import { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ErrorContext } from '../contexts/ErrorContext';

const MultiplicationByVariable = () => {
  const { showError6: show, setShowError6: setShow } = useContext(ErrorContext);

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
          <Modal.Title>Умножение на неизвестную</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Вы видите эту ошибку, поскольку попытались умножить обе части равенства на неизвестную.
          </p>

          <p>
            Умножение на неизвестную приводит к повышению степени уравнения и способно стать причиной появления посторонних корней или досадных ошибок в ходе решения.
          </p>

          <p>
            Обходитесь без повышения степени уравнения, когда это возможно. В частности, при решении любых линейных уравнений возможно получить правильное решение без умножения на неизвестную.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>Хорошо, больше не буду!</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MultiplicationByVariable;