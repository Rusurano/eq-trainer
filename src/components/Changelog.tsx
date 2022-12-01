import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Changelog = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        История версий
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>История версий</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>v0.9.1 (01.12.2022)</h3>
          <ul>
            <li>Исправлено отображение нуля в уравнениях.</li>
            <li>Улучшена совместимость вёрстки с мобильными устройствами.</li>
            <li>Заблокирована возможность умножения и деления на выражение с неизвестной.</li>
            <li>Добавлена система KaTeX для отображения уравнений по стандартам LaTeX.</li>
            <li>Теперь полностью поддерживаются рациональные числа! Тренируйтесь решать уравнения с дробями, и увидите, насколько они станут проще в решении!</li>
            <li>Добавлена система вывода ошибок, запрещающая действия, не имеющие смысла.</li>
            <li>Добавлена инструкция по пользованию.</li>
            <li>Добавлен список изменений.</li>
            <li>Теперь можно указывать только неизвестную без коэффициента 1.</li>
            <li>Переработан вычислительный интерфейс.</li>
          </ul>

          <h3>v0.9.0 (от 29.11.2022)</h3>
          <ul>
            <li>Первый выход в свет!</li>
          </ul>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Changelog;