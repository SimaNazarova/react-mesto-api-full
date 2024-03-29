import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api";
import * as auth from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect, useState } from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  useHistory,
} from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import logoSuccess from "../images/Union.svg";
import logoError from "../images/logoError.svg";

function App() {

  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);

  const [userEmail, setUserEmail] = useState({
    email: "",
  });

  const [currentUser, editUserInfo] = useState({});
  const [cards, setCards] = useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const [logo, setLogo] = useState("");

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const handleInfoTooltipClick = () => {
    setIsInfoTooltipOpen(true);
  };

  const [message, setMessage] = useState("");

  const [isImagePopupOpen, setImagePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
    setImagePopupOpen(false);
  };

  const [isLoadingButton, setIsLoadingButton] = useState(false);


// проверка токена
  useEffect(() => {
    function tokenCheck() {
      if (localStorage.getItem("jwt")) {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
          return auth
            .getContent(jwt)
            .then((res) => {
              if (res) {
                setLoggedIn(true);
                history.push("/");
                const userData = {
                  email: res.email,
                };
                setUserEmail(userData);
              }
            })
            .catch((err) => {
              if (err === "400") {
                return console.log("Токен не передан или передан не в том формате");
            }
            
            if (err === "401") {
              return console.log("Переданный токен некорректен ");
                }
          });
        }
      }
    }
    tokenCheck();
  }, [history]);

  //регистрация
  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then((res) => {
        if (res.email) {
          handleInfoTooltipClick();
          history.push("/sign-in");
          setLogo(logoSuccess);
          setMessage("Вы успешно зарегистрировались!");
        }
      })
      .catch((err) => {
        handleInfoTooltipClick();
        setLogo(logoError);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");

        if (err === "400") {
          return console.log("некорректно заполнено одно из полей ");
        }
      });
  };

  //авторизация
  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          history.push("/");
          setUserEmail({
            email: email,
          });
          console.log(res.token)
          
        }
      })
      .catch((err) => {
        if (err === "400") {
          return console.log("Не передано одно из полей ");
        }

        if (err === "401") {
          return console.log("Пользователь с email не найден ");
        }
      });
  };

  //выход из профиля
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
    setLoggedIn(false);
  };


  //загрузка карточек и данных юзера
  useEffect(() => {
    if(loggedIn) 
    {
      Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, user]) => {
        editUserInfo(user);
        setCards(cards.reverse());
      })
      .catch((err) => {
        console.log("Произошла ошибка:", err);
      });
    } 
  }, [loggedIn]) ;
  

  //поставновка и удаление лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    if (!isLiked) {
      api
        .putLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => {
          console.log("Произошла ошибка:", err);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => {
          console.log("Произошла ошибка:", err);
        });
    }
  }

  //удаление карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log("Произошла ошибка:", err);
      });
  }

  //обновление данных юзера
  function handleUpdateUser(userInfo) {
    setIsLoadingButton(true);
    api
      .editUserInfo(userInfo)
      .then((res) => {
        editUserInfo(res);
      })
      .catch((err) => {
        console.log("Произошла ошибка:", err);
      })

      .finally(() => {
        setIsLoadingButton(false);
        closeAllPopups();
      });
  }

  //добавление новой карточки
  function handleAddPlaceSubmit(cardInfo) {
    setIsLoadingButton(true);
    api
      .addNewCard(cardInfo)
      .then((card) => {
        setCards([card, ...cards]);
      })

      .catch((err) => {
        console.log("Произошла ошибка:", err);
      })

      .finally(() => {
        setIsLoadingButton(false);
        closeAllPopups();
      });
  }

  //обновление аватара
  function handleUpdateAvatar(avatar) {
    setIsLoadingButton(true);
    api
      .updateUserAvatar(avatar)
      .then((res) => {
        editUserInfo(res);
      })

      .catch((err) => {
        console.log("Произошла ошибка:", err);
      })

      .finally(() => {
        setIsLoadingButton(false);
        closeAllPopups();
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <div className="content">
            <Header
              handleSignOut={handleSignOut}
              loggedIn={loggedIn}
              userEmail={userEmail.email}
            />
            <Switch>
              <ProtectedRoute
                exact
                path="/"
                loggedIn={loggedIn}
                component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
              <Route path="/sign-in">
                <Login onLogin={handleLogin} />
              </Route>
              <Route path="/sign-up">
                <Register
                  onRegister={handleRegister}
                  onInfoTooltip={handleInfoTooltipClick}
                />
              </Route>

              <Route>
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
              </Route>
            </Switch>
            <Footer />
          </div>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            loadingButton={isLoadingButton ? "Сохранение..." : "Сохранить"}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            loadingButton={isLoadingButton ? "Сохранение..." : "Сохранить"}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            loadingButton={isLoadingButton ? "Сохранение..." : "Сохранить"}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            text={message}
            logo={logo}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={isImagePopupOpen}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
