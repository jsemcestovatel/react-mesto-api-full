import React from "react";

function AuthForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  buttontext,
}) {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  function resetForm() {
    setEmail("");
    setPassword("");
  }
  React.useEffect(() => {
    resetForm();
  }, []);

  return (
    <main className="auth">
      <h2 className="auth__header">{title}</h2>
      <form
        name={name}
        encType="text/plain"
        className="auth__form"
        onSubmit={(evt) => onSubmit(evt, email, password)}
      >
        <input
        //   type="email"
          id="email"
          className="auth__input"
          placeholder="Email"
          value={email || ""}
          onChange={(evt) => setEmail(evt.target.value)}
          //   required
        />
        {/* <span id="auth-email-error" className="auth__error"></span> */}
        <input
          type="password"
          id="password"
          className="auth__input"
          placeholder="Пароль"
          value={password || ""}
          onChange={(evt) => setPassword(evt.target.value)}
          //   required
        />
        {/* <span id="auth-password-error" className="auth__error"></span> */}
        <button type="submit" className="auth__submit-button link-opacity">
          {buttontext}
        </button>
      </form>
      {children}
    </main>
  );
}

export default AuthForm;
