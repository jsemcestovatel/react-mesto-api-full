import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isLoading, isOpen, onClose, onUpdateAvatar }) {
  const url = React.useRef();

  React.useEffect(() => {
    url.current.value = "";
  }, [isOpen]);

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения компонента с помощью REF во внешний обработчик
    onUpdateAvatar({
      avatar: url.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="updateavatar"
      buttonText={isLoading ? "Обновление..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        ref={url}
        id="avatar-link"
        name="avatar"
        className="popup__input popup__input_type_imagelink"
        placeholder="Ссылка на аватар"
        required
      />
      <span id="avatar-link-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
