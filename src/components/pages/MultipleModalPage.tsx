import React, {useCallback, useEffect} from 'react';
import {useModal} from "../../hooks/useModal.ts";
import {ModalContentDefaultStyles} from "../modal/defaultStyleClasses.ts";

const MultipleModalsPage: React.FC = () => {
  const { openModal, closeModal } = useModal();

  const openLargeModal = useCallback(() => {
    openModal(
      <div>
        <p>This is a large modal with custom content!</p>
      </div>,
      {
        id: 'large-modal',
        title: 'Large Modal',
        containerCustomClass: ModalContentDefaultStyles.container + ' !bg-blue-500 !max-w-lg',
        closeOnEsc: true,
        showCloseButton: true,
        buttons: [
          {
            label: 'Close',
            onClick: () => closeModal('large-modal'),
            customClass: ModalContentDefaultStyles.ctaButton + ' !bg-red-500',
          },
        ],
      }
    );
  }, [openModal, closeModal]);

  const openSmallModal = useCallback(() => {
    openModal(
      <div>
        <p>This is a small modal with custom content!</p>
      </div>,
      {
        id: 'small-modal',
        title: 'Small Modal',
        containerCustomClass: ModalContentDefaultStyles.container + ' !bg-green-500 !max-w-sm',
        closeOnEsc: true,
        showCloseButton: true,
        buttons: [
          {
            label: 'Close',
            onClick: () => closeModal('small-modal'),
            customClass: ModalContentDefaultStyles.ctaButton + ' !bg-yellow-500 !text-black',
          },
        ],
      }
    );
  }, [openModal, closeModal]);

  const openXLModal = useCallback(() => {
    openModal(
      <div>
        <p>This is a Extra Large modal with custom content!</p>
      </div>,
      {
        id: 'xl-modal',
        title: 'XL Modal',
        containerCustomClass: ModalContentDefaultStyles.container + ' !bg-red-500 !max-w-xl',
        closeOnEsc: true,
        showCloseButton: true,
        buttons: [
          {
            label: 'Close',
            onClick: () => closeModal('xl-modal'),
            customClass: ModalContentDefaultStyles.ctaButton + ' !bg-cyan-500',
          },
        ],
      }
    );
  }, [openModal, closeModal]);

  useEffect(() => {
    setTimeout(() => openXLModal(), 1000);
    setTimeout(() => openLargeModal(), 2000);
    setTimeout(() => openSmallModal(), 4000);
  }, [openLargeModal, openSmallModal, openXLModal])

  return (
    <div className="p-10 space-y-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={openLargeModal}
      >
        Open Large Modal
      </button>

      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        onClick={openSmallModal}
      >
        Open Small Modal
      </button>

      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={openXLModal}
      >
        Open XL Modal
      </button>
    </div>
  );
};

export default MultipleModalsPage;
