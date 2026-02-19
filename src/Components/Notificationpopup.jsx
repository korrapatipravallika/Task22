import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closePopup } from "../redux/Popup";

const GlobalNotification = () => {
  const dispatch = useDispatch();

  const { isOpen, message, type } =
    useSelector((state) => state.popup);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div
        className={`popup-box ${
          type === "success" ? "popup-success" : "popup-error"
        }`}
      >
        <p className="popup-message">{message}</p>
        <button
          className="popup-close-btn"
          onClick={() => dispatch(closePopup())}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default GlobalNotification;
