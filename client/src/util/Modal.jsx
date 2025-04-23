// Modal as a separate component
import { useEffect, useRef } from "react";

const Modal = ({ openModal, closeModal, children, confirmFunction }) => {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
      console.log("Modal opened");
    } else {
      ref.current?.close();
      console.log("Modal closed");
    }
  }, [openModal]);

  return (
    <dialog
      ref={ref}
      onCancel={closeModal}
      className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-transparent p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="text-end">
          <button
            onClick={closeModal}
            className="cursor-pointer pb-2 text-red-500"
          >
            X
          </button>
        </div>
        <div className="pt-2 pb-4">{children}</div>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="cursor-pointer rounded bg-red-500 px-4 py-2 text-white"
            onClick={confirmFunction}
          >
            Delete
          </button>
          <button
            className="cursor-pointer rounded bg-gray-500 px-4 py-2 text-white"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
