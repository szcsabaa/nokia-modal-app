import { createContext} from 'react';
import {ModalConfig, ModalContextType, ModalState} from "../types/modal.ts";
import {FC, ReactNode, useState} from "react";
import ModalContainer from "../components/modal/ModalContainer.tsx";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<ModalState[]>([]);

  const checkExistingModal = ({content, config}: ModalState, prevModals: ModalState[]) => {
    const existingModal = prevModals.find((modal) => modal.config.id === config.id);
    if (existingModal) {
      return prevModals;
    }
    return [
      ...prevModals,
      { content, config },
    ]
  }
  const openModal = (content: ReactNode, config: ModalConfig) => {
    setModals((prevModals) => checkExistingModal({content, config}, prevModals));
  };

  const closeModal = (id: string) => {
    setModals((prevModals) => prevModals.filter((modal) => modal.config.id !== id));
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modals }}>
      {children}
      <ModalContainer modals={modals} onClose={closeModal} />
    </ModalContext.Provider>
  );
};

export {ModalProvider, ModalContext};
