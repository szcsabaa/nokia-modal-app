import {ModalButtonConfig} from "../../types/modal.ts";
import ModalLayout from "./ModalLayout.tsx";
import ModalContent from "./ModalContent.tsx";

interface ModalProps {
  index: number;
  id: string;
  title?: string | undefined
  content: React.ReactNode;
  containerCustomClass?: string;
  titleCustomClass?: string;
  closeButtonCustomClass?: string;
  ctaContainerCustomClass?: string;
  showCloseButton?: boolean;
  buttons?: ModalButtonConfig[] | undefined;
  onClose: () => void;
}

const Modal = (props: ModalProps) => {
  const {
    index,
  } = props
  return (
    <ModalLayout index={index} >
      <ModalContent {...props}></ModalContent>
    </ModalLayout>
  );
}

export default Modal;