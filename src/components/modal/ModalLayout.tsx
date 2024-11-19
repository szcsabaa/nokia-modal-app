import clsx from "clsx";

interface ModalLayoutProps {
  index: number;
  children: React.ReactNode;
}

const ModalLayout = ({index, children}: ModalLayoutProps) => {
  return (
    <div
      className={clsx(
        'fixed inset-0 flex justify-center items-center',
        `z-[${index + 100}]`,
        'overflow-y-auto',
      )}
    >
      <div className="absolute inset-0 bg-gray-800 bg-opacity-50"/>
      {children}
    </div>
  )
}

export default ModalLayout;