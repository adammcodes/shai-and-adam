"use client";
import { useEffect } from "react";

interface ModalProps {
  title: string;
  justify?: string;
  height?: string;
  maxHeight?: string;
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  confirmCancel?: boolean;
}

export default function Modal({
  title,
  justify = "justify-center",
  maxHeight = "max-h-[800px]",
  height = "h-full",
  children,
  isOpen,
  handleClose,
  confirmCancel,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <dialog
        open={isOpen}
        onClose={handleClose}
        className={`h-[90%] ${maxHeight} w-[80%] max-w-[600px] rounded-[30px] inset-0 overflow-y-auto z-50 shadow-lg rounded-md`}
        style={{
          position: "fixed",
          zIndex: 9999,
        }}
      >
        <div
          className={`flex flex-col items-center ${justify} gap-y-4 bg-gray-100 w-full ${height} rounded-md z-50 p-2 lg:p-4`}
        >
          {/* Modal header */}
          <div className="flex justify-center items-center m-0 p-0">
            <h1 className="font-bold text-[1.1em] lg:text-2xl">{title}</h1>
          </div>
          {/* Modal content */}
          <div className="w-full h-full">{children}</div>
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
      </dialog>
    </>
  );
}
