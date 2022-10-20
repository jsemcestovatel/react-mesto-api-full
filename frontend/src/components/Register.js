import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register( {onSignUp} ) {
  function handleSubmit(evt, email, password) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    //   console.log(evt.target.elements.email.value);
    onSignUp({email,password})
  }

  return (
    <AuthForm
      title="Регистрация"
      name="register"
      buttontext="Зарегистрироваться"
      //   isOpen={isOpen}
      //   onClose={onClose}
      onSubmit={handleSubmit}
    >
      <p>
        {`Уже зарегистрированы? `}
        <Link to="/sign-in" className="header__link link-opacity">
          Войти
        </Link>
      </p>
    </AuthForm>
  );
}

export default Register;
