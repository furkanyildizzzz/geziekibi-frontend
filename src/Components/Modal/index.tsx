"use client";

import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

interface ModalComponentInterface {
  children: React.ReactNode;
  title: string;
}

const ModalComponent: React.FC<ModalComponentInterface> = ({
  children,
  title,
}) => {
  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  const router = useRouter();
  const onHide = () => {
    router.back();
  };

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      backdrop={true}
      keyboard={true}
      onClosed={onHide}
    >
      <ModalHeader toggle={toggle} onClick={onHide}>
        <h1 className="modal-title fs-5">{title}</h1>
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};
export default ModalComponent;
