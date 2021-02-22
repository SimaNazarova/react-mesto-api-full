import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    onLogin(email, password);
  };

  return (
    <div className="auth">
      <p className="auth__title">Вход</p>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          placeholder="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={data.email}
        />
        <input
          className="auth__input"
          placeholder="Пароль"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={data.password}
        />
        <button className="auth__button">Войти</button>
      </form>
    </div>
  );
};

export default withRouter(Login);
