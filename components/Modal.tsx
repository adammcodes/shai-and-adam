// pop-up Modal component that takes in a title and children props
"use client";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  confirmCancel?: boolean;
}

export default function Modal({
  title,
  children,
  isOpen,
  handleClose,
  confirmCancel,
}: ModalProps) {
  return (
    <dialog
      open={isOpen}
      onClose={handleClose}
      className="h-[80%] max-h-[500px] w-[80%] max-w-[600px] rounded-[30px] fixed z-[20] inset-0 overflow-y-auto border-2 border-[#06b6d4]"
    >
      <div className="flex w-full items-center justify-center h-full py-[20px] px-[15px]">
        <div className="bg-white w-full rounded-md px-2 py-2 lg:p-5 m-5 h-full flex flex-col items-center justify-center gap-y-10">
          {/* Modal header */}
          <div className="flex justify-center items-center p-0">
            <h1 className="font-bold text-[1.1em] lg:text-3xl">{title}</h1>
          </div>
          {/* Modal content */}
          <div className="w-full">{children}</div>
          {/* Modal footer */}
          {!confirmCancel && (
            <button
              onClick={handleClose}
              className="text-2xl border border-2 py-2 px-5 rounded-lg hover:bg-[#06b6d4] hover:text-white"
            >
              OK
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
}
