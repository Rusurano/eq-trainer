import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Manual = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        Как пользоваться
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Как пользоваться</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Смысл тренировщика</h3>

          <p>
            Тренировщик поможет Вам научиться быстро и точно решать линейные уравнения. Это самый простой вид уравнений, который важно освоить, прежде чем переходить к более сложным их разновидностям. Несмотря на их простоту, многим людям по каким-то причинам трудно понять подход к их решению.
          </p>

          <p>
            Тренировщик помогает восполнить все основные пробелы знаний основ математики и, в частности, арифметики, касающихся решения уравнений. От пользователя — желание обучаться и упорство, а от тренировщика — всегда новое уравнение, проверяющее качество усвоения материала. 
          </p>

          <h3>Применение</h3>

          <p>
            Даётся линейное уравнение, которое необходимо решить <strong>по действиям</strong>. Каждое действие — операция, применяющаяся к обеим частям равенства. Если операция не имеет смысла, она не будет совершена, а на экран выведется сообщение с объяснением ошибки. 
          </p>

          <p>
            Разрешено <strong>прибавлять</strong> любое число к обеим частям неравенства, <strong>вычитать</strong> любое число из обеих частей неравенства, <strong>умножать</strong> обе части равенства на любое число и <strong>делить</strong> обе части равенства на любое число. Также можно воспользоваться кнопкой <strong>умножения на -1</strong>, если необходимо поменять все знаки на противоположные.
          </p>

          <p>
            Уравнение считается <strong>решённым относительно неизвестной</strong>, если в левой части равенства находится только неизвестная, а в правой нигде нет этой неизвестной. Этого и нужно добиться равносильными преобразованиями.
          </p>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Manual;