import clsx from "clsx";
import {ModalState} from "../../types/modal.ts";
import {FC, useEffect} from "react";
import ReactDOM from 'react-dom';
import ModalLayout from "./ModalLayout.tsx";

interface ModalContainerProps {
  modals: ModalState[];
  onClose: (id: string) => void;
}

const ModalContainer: FC<ModalContainerProps> = ({ modals, onClose }) => {
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      // Only close the last modal (most recently opened)
      if (e.key === 'Escape' && modals.length > 0) {
        const lastModal = modals[modals.length - 1]; // Get the most recent modal
        if (lastModal.config.closeOnEsc) {
          onClose(lastModal.config.id);
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);

    // Cleanup event listeners on unmount
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
          <div
            key={modal.config.id}
            className={clsx(
              'fixed inset-0 flex justify-center items-center',
              `z-[${index + 50}]`,
              'overflow-y-auto',
            )}
          >
            {/* Modal Overlay */}
            <div className="absolute inset-0 bg-gray-800 bg-opacity-50" />

            {/* Modal Content */}
            <ModalLayout
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
            />
          </div>,
          document.body // Attach modal to the body
        );
      })}
    </>
  );
};

export default ModalContainer;
