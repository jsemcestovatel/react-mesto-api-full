import React from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function AddPlacePopup({ isLoading, isOpen, onClose, onAddPlace }) {
  const {values, handleChange, setValues} = useForm({});

  React.useEffect(() => {
    setValues({name:'',link:''});
  }, [isOpen]);

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="addelement"
      buttonText={isLoading ? "Создание..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="image-name"
        name="name"
        className="popup__input popup__input_type_imagename"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={values.name || ""}
        onChange={handleChange}
        required
      />
      <span id="image-name-error" className="popup__error"></span>
      <input
        type="url"
        id="image-link"
        name="link"
        className="popup__input popup__input_type_imagelink"
        placeholder="Ссылка на картинку"
        value={values.link || ""}
        onChange={handleChange}
        required
      />
      <span id="image-link-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
