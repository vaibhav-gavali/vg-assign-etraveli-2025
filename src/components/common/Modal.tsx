import React from 'react';
import styled from 'styled-components';
import Row from './Row';
import { MdClose } from 'react-icons/md';

const ModalBackground = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBody = styled.div`
  background-color: white;
  margin: 10% auto;
  padding: 20px;
  width: 50%;
  border-radius: 10px;
`;

interface Props {
  children: any;
  shouldShow: boolean;
  onRequestClose?: () => void;
  headerLabel?: string;
}

const Modal: React.FC<Props> = ({
  shouldShow,
  onRequestClose,
  children,
  headerLabel,
}) => {
  return shouldShow ? (
    <ModalBackground onClick={onRequestClose}>
      <ModalBody
        onClick={(e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation()}
      >
        <Row styles={{ marginBottom: 20 }} justifyContent="space-between">
          <div style={{ fontWeight: 'bold', fontSize: 24 }}>{headerLabel}</div>
          <MdClose className="icon" onClick={onRequestClose} />
        </Row>
        <Row fullWidth>{children}</Row>
      </ModalBody>
    </ModalBackground>
  ) : null;
};

export default Modal;
