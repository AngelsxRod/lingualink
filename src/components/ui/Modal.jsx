import { useEffect, useRef } from "react";
import { X } from "lucide-react";
export const Modal = ({ title, isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] overflow-auto">
      <div className="fixed inset-0 w-full h-full bg-[rgba(0,0,0,0.6)] backdrop-blur-xs"></div>
      <div
        ref={modalRef}
        className="relative w-full max-w-xl p-6 bg-white shadow-lg rounded-xl z-[1001]"
      >
        <div className="flex items-center pb-3 border-b border-gray-300">
          <div className="flex-1 text-xl font-bold text-gray-800">
            {title ? <h2 className="text-xl font-bold">{title}</h2> : null}
          </div>
          <button
            onClick={onClose}
            className="active:scale-95  text-rose-500 transition-colors duration-200 hover:text-rose-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="my-6">{children}</div>
      </div>
    </div>
  );
};
