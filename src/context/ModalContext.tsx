import {createContext, useCallback} from 'react';
import {ModalConfig, ModalContextType, ModalState} from "../types/modal.ts";
import {useState} from "react";
import ModalContainer from "../components/modal/ModalContainer.tsx";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: React.ReactNode
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<ModalState[]>([]);

  const checkExistingModal = useCallback(({content, config}: ModalState, prevModals: ModalState[]) => {
    const existingModal = prevModals.find((modal) => modal.config.id === config.id);
    if (existingModal) {
      return prevModals;
    }
    return [
      ...prevModals,
      { content, config },
    ]
  }, [])

  const openModal = useCallback((content: React.ReactNode, config: ModalConfig) => {
    setModals((prevModals) => checkExistingModal({content, config}, prevModals));
  }, [checkExistingModal]);

  const closeModal = useCallback((id: string) => {
    setModals((prevModals) => prevModals.filter((modal) => modal.config.id !== id));
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modals }}>
      {children}
      <ModalContainer modals={modals} onClose={closeModal} />
    </ModalContext.Provider>
  );
};

export {ModalProvider, ModalContext};
