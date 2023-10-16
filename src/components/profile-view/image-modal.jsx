
import {Button, Modal} from 'react-bootstrap';

const FullscreenModal = ({ show, onHide, image } ) => {
console.log(image)
  return (
    <div>
      <Modal show={show} onHide={onHide} fullscreen  dialogClassName="fullscreen-modal">
      <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
        <img src={image} alt="" style={{ width: '100%' }}/>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FullscreenModal;


