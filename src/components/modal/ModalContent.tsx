import clsx from 'clsx';
import {ModalButtonConfig} from "../../types/modal.ts";
import {ModalContentDefaultStyles} from "./defaultStyleClasses.ts";

interface ModalContentProps {
  id: string;
  title?: string;
  content: React.ReactNode;
  containerCustomClass?: string;
  closeButtonCustomClass?: string;
  titleCustomClass?: string;
  ctaContainerCustomClass?: string;
  showCloseButton?: boolean;
  buttons?: ModalButtonConfig[];
  onClose: () => void;
}

const ModalContent: React.FC<ModalContentProps> = (props: ModalContentProps) => {
  const {
    title,
    content,
    containerCustomClass,
    closeButtonCustomClass,
    titleCustomClass,
    ctaContainerCustomClass,
    showCloseButton = true,
    buttons = [],
    onClose,
  } = props

  return (
    <div
      className={clsx(
        containerCustomClass || ModalContentDefaultStyles.container,
      )}
    >
      {showCloseButton && (
        <button
          className={clsx(closeButtonCustomClass || ModalContentDefaultStyles.closeButton)}
          onClick={onClose}
          name={"close"}
        >
          &times;
        </button>
      )}

      {title && <h2 className={clsx(titleCustomClass || ModalContentDefaultStyles.title)}>{title}</h2>}

      <div>{content}</div>

      {buttons.length > 0 && (
        <div className={clsx(ctaContainerCustomClass || ModalContentDefaultStyles.ctaContainer)}>
          {buttons.map((button, idx) => (
            <button
              key={idx}
              className={clsx(
                button.customClass || ModalContentDefaultStyles.ctaButton
              )}
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModalContent;
