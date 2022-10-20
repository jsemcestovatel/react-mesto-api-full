import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useForm from "../hooks/useForm";

function EditProfilePopup({ isLoading, isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const {values, handleChange, setValues} = useForm({});

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах
  React.useEffect(() => {
    setValues({
      name: currentUser != null ? currentUser.name : "", 
      about: currentUser != null ? currentUser.about : ""
    });
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values.name,
      about: values.about
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="editprofile"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="name"
        name="name"
        className="popup__input popup__input_type_name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={values.name || ""}
        onChange={handleChange}
        required
      />
      <span id="name-error" className="popup__error"></span>
      <input
        type="text"
        id="about"
        name="about"
        className="popup__input popup__input_type_description"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        value={values.about || ""}
        onChange={handleChange}
        required
      />
      <span id="about-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
