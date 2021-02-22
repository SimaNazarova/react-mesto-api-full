import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
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
    onRegister(email, password);
  };

  return (
    <div className="auth">
      <p className="auth__title">Регистрация</p>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          value={data.email}
          name="email"
          placeholder="Email"
          required
          type="email"
          onChange={handleChange}
        />
        <input
          className="auth__input"
          value={data.password}
          name="password"
          placeholder="Пароль"
          type="password"
          onChange={handleChange}
          required
        />
        <button className="auth__button" type="submit">
          Зарегистрироваться
        </button>
        <p className="auth__subtitle">
          Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="auth__subtitle-link">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
