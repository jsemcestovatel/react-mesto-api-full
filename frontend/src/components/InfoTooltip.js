import React from "react";
import ok from "../images/ok.svg";
import error from "../images/error.svg";

function InfoTooltip({ onClose, isOpen, authorization }) {
  return (
    <section className={`popup ${isOpen ? `popup_opened ` : ``}popup_dark`}>
      <div className="popup__container">
        <button
          aria-label="Закрыть окно"
          type="button"
          className="popup__close-button link-opacity"
          onClick={onClose}
        ></button>
        <img
          src={authorization.state ? ok : error}
          alt={`Иллюстрация ${authorization.state}`}
          className="popup__sign"
        />
        <h2 className="popup__notification">{authorization.text}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
