import logo from "../images/logo.svg";
import { NavLink, Route } from "react-router-dom";

function Header({ handleSignOut, userEmail, loggedIn }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <div className="header__menu">
        <Route path="/sign-in">
          <NavLink to="/sign-up" className="header__link">
            Регистрация
          </NavLink>
        </Route>

        <Route path="/sign-up">
          <NavLink to="/sign-in" className="header__link">
            Войти
          </NavLink>
        </Route>
        {loggedIn && (
          <Route exact path="/">
            <p className="header__email">{userEmail}</p>
            <NavLink
              to="/sign-in"
              className="header__link header__link_exit"
              onClick={handleSignOut}
            >
              Выйти
            </NavLink>
          </Route>
        )}
      </div>
    </header>
  );
}

export default Header;
