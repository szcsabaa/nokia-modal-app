import {ModalState} from "../../types/modal.ts";
import {useEffect} from "react";
import ReactDOM from 'react-dom';
import Modal from "./Modal.tsx";

interface ModalContainerProps {
  modals: ModalState[];
  onClose: (id: string) => void;
}

const ModalContainer: React.FC<ModalContainerProps> = ({ modals, onClose }) => {
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modals.length > 0) {
        const lastModal = modals[modals.length - 1];
        if (lastModal.config.closeOnEsc) {
          onClose(lastModal.config.id);
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [modals, onClose]);

  return (
    <>
      {modals.map((modal, index) => {
        const {
          containerCustomClass,
          titleCustomClass,
          closeButtonCustomClass,
          ctaContainerCustomClass,
          showCloseButton,
        } = modal.config;

        return ReactDOM.createPortal(
          <Modal
            index={index}
            id={modal.config.id}
            title={modal.config.title}
            content={modal.content}
            containerCustomClass={containerCustomClass}
            titleCustomClass={titleCustomClass}
            closeButtonCustomClass={closeButtonCustomClass}
            ctaContainerCustomClass={ctaContainerCustomClass}
            showCloseButton={showCloseButton}
            buttons={modal.config.buttons}
            onClose={() => onClose(modal.config.id)}
          />,
          document.body
        );
      })}
    </>
  );
};

export default ModalContainer;
