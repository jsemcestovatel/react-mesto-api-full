import React from "react";
import AuthForm from "./AuthForm";

function Login( {onSignIn} ) {
  function handleSubmit(evt, email, password) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    //   console.log(evt.target.elements.email.value);
    onSignIn({ email, password });
  }

  return (
    <AuthForm
      title="Вход"
      name="login"
      buttontext="Войти"
      //   isOpen={isOpen}
      //   onClose={onClose}
      onSubmit={handleSubmit}
    ></AuthForm>
  );
}

export default Login;
