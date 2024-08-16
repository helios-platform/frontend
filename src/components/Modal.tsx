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
        className="fixed left-[24%] right-[24%] top-[14%] flex items-center justify-center p-4 bg-transparent"
        onClick={handleClickOutside}
      >
        <div className="w-full max-w-screen bg-[#16233E] rounded-lg border border-custom-dark-blue shadow-medium backdrop-filter backdrop-blur-sm">
          <div className="flex justify-between items-center border-b border-custom-dark-blue p-4">
            <h3 className="text-lg font-semibold text-white">AI Response</h3>
            <button
              onClick={onClose}
              className="text-white hover:text-custom-light-purple transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-light-purple"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="p-4 overflow-y-auto max-h-[60vh]">
            <pre className="whitespace-pre-wrap break-words text-white">{text}</pre>
          </div>
        </div>
      </dialog>
  );
};

export default Modal