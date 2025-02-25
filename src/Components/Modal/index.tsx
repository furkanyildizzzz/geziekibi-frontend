"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

interface ModalComponentInterface {
  children: React.ReactNode;
  title: string;
  size?: "sm" | "lg" | "xl"; // Opsiyonel boyut parametresi
}

const ModalComponent: React.FC<ModalComponentInterface> = ({
  children,
  title,
  size,
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
      size={size} // Varsayılan olarak boyutsuz (mevcut boyutta) kalır
    >
      <ModalHeader toggle={toggle} onClick={onHide}>
        <h1 className="modal-title fs-5">{title}</h1>
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};
export default ModalComponent;
