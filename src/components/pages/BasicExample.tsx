import {useModal} from "../../hooks/useModal.ts";
import {FC} from "react";

const MyComponent: FC = () => {
  const {openModal, closeModal} = useModal();

  const handleOpenModal = () => {
    const modalId = 'my-modal'; // Explicitly define the modal ID
    openModal(
      <div>
        <p>This is some dynamic content!</p>
      </div>,
      {
        id: modalId, // Pass the modal ID in the config
        title: 'My Dynamic Modal',
        closeOnEsc: true,           // Enable close on ESC key
        showCloseButton: false,     // Hide the close (X) button
        buttons: [
          {
            label: 'Close',
            onClick: () => closeModal(modalId),
          },
        ],
      }
    );
  };

  return (
    <div>
      <button
        className="bg-green-500 text-white p-3 rounded"
        onClick={handleOpenModal}
      >
        Open Modal
      </button>
    </div>
  );
};

export default MyComponent;
