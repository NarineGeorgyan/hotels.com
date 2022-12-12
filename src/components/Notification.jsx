import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const Notification = () => {
  const [isModal, setIsModal] = useState(false);
  const { errorMessage } = useSelector((state) => ({
    ...state.errorMessage,
  }));
  const dispatch = useDispatch();

  const closeHandler = () => {
    setIsModal(true);
    dispatch({ type: 'FAILED_ACTION', payload: '' });
  };
  return (
    <>
      <Container className="zIndex position-absolute">
        <Row>
          <Col>
            {!isModal ? (
              <div
                className="modal show "
                style={{ display: 'block', position: 'initial' }}
              >
                <Modal.Dialog>
                  <Modal.Header>
                    <Modal.Title>{errorMessage.name}</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <p>{errorMessage.message}</p>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={closeHandler}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </div>
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Notification;
