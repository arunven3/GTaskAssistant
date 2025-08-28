"use client";

import {
  Button,
  Modal as BaseModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { useState } from "react";

export function Modal({
  HeaderText,
  body,
  footer,
}: {
  HeaderText: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
}) {
  const [openModal, setOpenModal] = useState(true);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>

      <BaseModal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>{HeaderText}</ModalHeader>
        <ModalBody>
          <div className="space-y-6">{body}</div>
        </ModalBody>
        <ModalFooter>{footer}</ModalFooter>
      </BaseModal>
    </>
  );
}
