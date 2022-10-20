import React from "react";
import imgLogo from "../images/logo.svg";
import { Switch, Route, Link } from "react-router-dom";
import UserData from './UserData';
import burger from '../images/burger.svg';

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img src={imgLogo} alt="Логотип" className="header__logo" />
      <Switch>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link link-opacity">
            Войти
          </Link>
        </Route>

        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link link-opacity">
            Регистрация
          </Link>
        </Route>

        <Route exact path="/">
          <UserData email={email} onSignOut={onSignOut} />
          {/* <Menu/> */}
          {/* <img src={burger}></img> */}
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
