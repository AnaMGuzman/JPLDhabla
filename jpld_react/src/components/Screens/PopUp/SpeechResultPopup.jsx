import React, { useState } from "react";
import "./SpeechResultPopup.css";

export const SpeechResultPopup = ({ isVisible, isCorrect, onNext, onClose }) => {
  const [closing, setClosing] = useState(false);

  if (!isVisible) return null;

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose(); 
    }, 300); 
  };

  return (
    <div className={`popup-overlay ${closing ? "closing" : ""}`}>
      <div className="popup-box">
        <h2 className={isCorrect ? "popup-correct" : "popup-wrong"}>
          {isCorrect ? "¡Muy bien! :D " : "Intenta de nuevo :( "}
        </h2>

        <button
          className="popup-btn"
          onClick={isCorrect ? handleClose : handleClose}
        >
          {isCorrect ? "Repetir" : "Cerrar"}
        </button>
      </div>
    </div>
  );
};
