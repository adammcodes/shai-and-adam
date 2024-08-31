import React, { useState } from "react";
import Modal from "@/components/Modal";
import type { GuestData } from "@/helpers/guestData";

export type CustomMessageModalProps = {
  guestData: GuestData;
  groupNames: string[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customMessage: string, guestData: GuestData, sendToGroup: boolean) => void;
};

export default function CustomMessageModal({
  guestData,
  groupNames,
  isOpen,
  onClose,
  onSubmit,
}: CustomMessageModalProps) {
  const [sendToGroup, setSendToGroup] = useState<boolean>(true);
  const [customMessage, setCustomMessage] = useState<string>("");
  const [confirmation, setConfirmation] = useState<boolean>(false);

  const groupNamesString = groupNames.join(", ");
  const guestName = guestData.name;
  const recipient = sendToGroup ? groupNamesString : guestName;

  const handleCustomMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomMessage(e.target.value);
  };

  const handleSubmit = () => {
    setConfirmation(true);
  };

  const handleConfirmSend = () => {
    onSubmit(customMessage, guestData, sendToGroup);
    onClose();
  };

  return (
    <Modal
      title={`Custom Message`}
      // justify="start"
      isOpen={isOpen}
      handleClose={onClose}
      confirmCancel={true}
    >
      <section className="w-full h-full">
        <label className="w-[50%] cursor-pointer flex items-center gap-x-4 mb-4">
          <input
            type="checkbox"
            className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus-none"
            checked={sendToGroup}
            onChange={() => setSendToGroup(!sendToGroup)}
          />
          <span className={`opacity-${sendToGroup ? `100` : `50`}`}>
            Send to everyone in the group
          </span>
        </label>
        <p className="text-left">{`Dear ${recipient}:`}</p>
        <textarea
          value={customMessage}
          onChange={handleCustomMessageChange}
          className="p-2 w-full h-[60%] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none my-4"
          placeholder="Enter your custom message here..."
        />
        <p className="text-left">
          With Love,
          <br /> Adam & Shai
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-black bg-green-200 rounded-md hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
        {confirmation && (
          <div className="flex justify-end space-x-2 mt-4">
            <p className="text-sm text-gray-700">Are you sure you want to send the email?</p>
            <button
              onClick={handleConfirmSend}
              className="px-4 py-2 text-sm font-medium text-black bg-green-200 rounded-md hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Yes, send the email!
            </button>
            <button
              onClick={() => setConfirmation(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              No, I'm not done.
            </button>
          </div>
        )}
      </section>
    </Modal>
  );
}
