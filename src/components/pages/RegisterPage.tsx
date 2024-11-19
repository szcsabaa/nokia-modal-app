import {useModal} from "../../hooks/useModal.ts";
import RegisterForm from "../form/RegisterForm.tsx";
import {ModalContentDefaultStyles} from "../modal/defaultStyleClasses.ts";
import {useCallback} from "react";

const RegisterPage: React.FC = () => {
  const { openModal, closeModal } = useModal();

  const openSuccessConfirmation = useCallback(() => {
    openModal(
      <div>
        <p className="text-center">Registration Successful!</p>
      </div>,
      {
        id: 'success-confirmation',
        title: 'Success',
        containerCustomClass: ModalContentDefaultStyles.container + ' !bg-green-500 !text-white !max-w-md',
        closeOnEsc: true,
        showCloseButton: true,
        buttons: [
          {
            label: 'Close',
            onClick: () => closeModal('success-confirmation'),
          },
        ],
      }
    );
  }, [openModal, closeModal]);

  const openRegisterForm = useCallback(() => {
    openModal(
      <RegisterForm onSubmitSuccess={() => {
        closeModal('register-form'); // Close the register form modal
        openSuccessConfirmation();
      }} />,
      {
        id: 'register-form',
        title: 'Register',
        containerCustomClass: ModalContentDefaultStyles.container + ' !bg-gray-100 !text-black !max-w-md',
        closeOnEsc: true,
        showCloseButton: true,
      }
    );
  }, [openModal, closeModal, openSuccessConfirmation]);

  return (
    <div className="p-10">
      <button
        onClick={openRegisterForm}
        className="px-6 py-3 bg-blue-500 text-white rounded"
      >
        Open Registration Form
      </button>
    </div>
  );
};

export default RegisterPage;
