import {ReactNode} from "react";

export interface ModalButtonConfig {
  label: string;
  onClick: () => void;
  customClass?: string;
}

export interface ModalConfig {
  id: string;
  buttons?: ModalButtonConfig[];
  title?: string;
  closeOnEsc?: boolean;
  containerCustomClass?: string;
  closeButtonCustomClass?: string;
  titleCustomClass?: string;
  ctaContainerCustomClass?: string;
  showCloseButton?: boolean;
}

export interface ModalState {
  content: ReactNode;
  config: ModalConfig;
}

export interface ModalContextType {
  openModal: (content: ReactNode, config: ModalConfig) => void;
  closeModal: (id: string) => void;
  modals: ModalState[];
}