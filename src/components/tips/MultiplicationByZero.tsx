import { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ErrorContext } from '../contexts/ErrorContext';

const MultiplicationByZero = () => {
  const { showError5: show, setShowError5: setShow } = useContext(ErrorContext);

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
          <Modal.Title>Умножение на ноль</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Вы видите эту ошибку, поскольку попытались умножить обе части равенства на ноль.
          </p>

          <p>
            Умножая обе части равенства на ноль, Вы получите верное равенство — ноль действительно будет равен нулю — однако, сделаете дальнейшее решение уравнения невозможным, поскольку из него исчезнет неизвестная. Это противоречит главной цели — получению <strong>решений уравнения</strong>, то есть, тех значений неизвестной, при которой уравнение обращается в равенство.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>Хорошо, больше не буду!</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MultiplicationByZero;