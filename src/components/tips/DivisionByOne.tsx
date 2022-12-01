import { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ErrorContext } from '../contexts/ErrorContext';

const DivisionByOne = () => {
  const { showError1: show, setShowError1: setShow } = useContext(ErrorContext);

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
          <Modal.Title>Деление на единицу</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Вы видите эту ошибку, поскольку попытались разделить обе части равенства на единицу.
          </p>

          <p>
            В случае с равенствами это действие не несёт в себе никакой пользы, поскольку ничего не изменит. По одному из свойств единицы деление любого числа на единицу не изменяет это число. Следовательно, деление левой и правой частей равенства на единицу также их не изменяет.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>Хорошо, больше не буду!</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DivisionByOne;