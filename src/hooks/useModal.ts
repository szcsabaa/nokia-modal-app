import {useContext} from "react";
import {ModalContextType} from "../types/modal.ts";
import {ModalContext} from "../context/ModalContext.tsx";

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};