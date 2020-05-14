import React from "react";
import { Modal } from "@material-ui/core";

interface PreviewModalsType {
  title: string;
  image: string;
  open: boolean;
}

export default function PreviewModals(props: PreviewModalsType): JSX.Element {
  const handleClose = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ): void => {
    //
  };
  const { title, image, open } = props;
  return (
    <Modal open={open} onClose={handleClose}>
      <div></div>
    </Modal>
  );
}
