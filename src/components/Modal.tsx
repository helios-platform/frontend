import { useRef, useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ text, isOpen, onClose }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (isOpen) {
      dialogElement.showModal();
    } else {
      dialogElement.close();
    }
  }, [isOpen]);

  const handleClickOutside = (event) => {
    const dialogDimensions = dialogRef.current.getBoundingClientRect();
    if (
      event.clientX < dialogDimensions.left ||
      event.clientX > dialogDimensions.right ||
      event.clientY < dialogDimensions.top ||
      event.clientY > dialogDimensions.bottom
    ) {
      onClose();
    }
  };

  return (
      <dialog
        ref={dialogRef}
        className="fixed left-[24%] right-[24%] top-[14%] flex items-center justify-center p-4 backdrop:bg-gray-800/50"
        onClick={handleClickOutside}
      >
        <div className="bg-white rounded-lg flex flex-col max-h-[80vh]">
          <div className="flex justify-between items-center border-b p-4">
            <h3 className="text-lg font-semibold">AI Response</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="p-4 overflow-y-auto flex-grow">
            <pre className="whitespace-pre-wrap break-words">{text}</pre>
          </div>
        </div>
      </dialog>
  );
};

export default Modal