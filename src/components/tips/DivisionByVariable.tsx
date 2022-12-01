import { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ErrorContext } from '../contexts/ErrorContext';

const DivisionByVariable = () => {
  const { showError2: show, setShowError2: setShow } = useContext(ErrorContext);

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
          <Modal.Title>Деление на неизвестную</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Вы видите эту ошибку, поскольку попытались разделить обе части равенства на неизвестную.
          </p>

          <p>
            Деление на неизвестную в отдельных случаях приводит к делению на ноль. Поскольку заведомо неизвестно, равна ли она нулю, делить на неё опасно.
          </p>

          <p>
            Конечно, можно проверить, может ли неизвестная равняться нулю, простейшей подстановкой нуля на её место и проверкой, обратится ли уравнение в равенство, и если нет, делить на неё смело, но при решении приведённых здесь уравнений в этом нет нужды.
          </p>

          <p>
            Обходитесь другими разрешёнными действиями. Их вполне достаточно для успешного решения любого из представленных уравнений.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>Хорошо, больше не буду!</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DivisionByVariable;