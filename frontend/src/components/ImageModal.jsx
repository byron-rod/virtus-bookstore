import React from "react";

const ImageModal = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center mt-24">
      <div className="bg-white p-4 rounded-lg">
        <div className="max-h-[75vh] overflow-auto">
          <img
            src={imageSrc}
            alt="Enlarged view"
            className="max-w-full h-auto rounded-md"
          />
        </div>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-third text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
