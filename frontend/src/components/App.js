import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Spinner from './Spinner';
import ProtectedRoute from './ProtectedRoute';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Footer from './Footer';
import api from '../utils/Api';
import auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '',
  });
  const [currentUser, setCurrentUser] = React.useState();
  const [cards, setCards] = React.useState([]);
  const [visible, setVisible] = React.useState();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [authorization, setAuthorization] = React.useState({
    state: false,
    text: 'none',
  });
  function handleDeleteCard(card) {
    api
      .deleteCardApi(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => (c._id === card._id ? '' : c)));
      })
      .catch((err) => {
        console.log(`Возникла ошибка. ${err}`);
      });
  }

  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch((err) => {
        console.log(`Возникла ошибка. ${err}`);
      });
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  React.useEffect(() => {
    // показ прелоадера
    if (isLoggedIn) {
      setVisible(true);
      // Загрузка данных пользователя и карточек
      Promise.all([api.getUserInfoApi(), api.getCardsApi()])
        .then(([data, cards]) => {
          setCurrentUser(data);
          setCards(cards);
        })
        .catch((err) => {
          console.log(`Возникла ошибка. ${err}`);
        })
        .finally(() => {
          // скрытие прелоадера
          setVisible(false);
        });
    }
  }, [isLoggedIn]);

  // обработчик нажатия Escape

  // Создаем переменную isOpen снаружи useEffect, в которой следим за всеми состояниями попапов.
  // Если хоть одно состояние true или не null, то какой-то попап открыт, значит, навешивать нужно обработчик.
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isInfoTooltipPopupOpen ||
    selectedCard.link;

  React.useEffect(() => {
    // Объявляем функцию внутри useEffect, чтобы она не теряла свою ссылку при обновлении компонента.
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    // Как только он становится true, то навешивается обработчик, когда в false, тогда удаляется обработчик.
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      // И не забываем удалять обработчик в clean up функции через return
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
    // А также массив зависимостей c isOpen, чтобы отслеживать изменение этого показателя открытости.
  }, [isOpen]);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleUpdateUser(user) {
    setIsLoading(true);
    api
      .setUserInfoApi(user)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Возникла ошибка. ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .setUserAvatarApi(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Возникла ошибка. ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api
      .addNewCardApi(newCard)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Возникла ошибка. ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  function onSignOut() {
    auth
      .signOutApi()
      .catch((err) => {
        console.log(`Возникла ошибка. ${err}`);
      })
      .finally(() => {
        localStorage.removeItem('jwt');
        setEmail('');
        setIsLoggedIn(false);
      });
  }

  function handleSignUp(data) {
    auth
      .signUpApi(data)
      .then((res) => {
        setAuthorization({
          state: true,
          text: 'Вы успешно зарегистрировались!',
        });
        setIsInfoTooltipPopupOpen(true);
        console.log(12);
        handleSignIn(data);
        // handleTokenCheck();
        // history.push("/sign-in");
        history.push('/');
      })
      .catch((err) => {
        console.log(`Возникла ошибка. ${err}`);
        setAuthorization({
          state: false,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleSignIn(data) {
    auth
      .signInApi(data)
      .then((res) => {
        if (res.token) {
          console.log(data);
          localStorage.setItem('jwt', res.token);
          // handleTokenCheck();
          setEmail(data.email);
          setIsLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(`Возникла ошибка. ${err}`);
        setAuthorization({
          state: false,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleTokenCheck() {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .authApi(token)
        .then((res) => {
          setEmail(res.email);
          setIsLoggedIn(true);
          history.push('/');
        })
        .catch((err) => {
          console.log(`Возникла ошибка. ${err}`);
          history.push('/sign-in');
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header email={email} onSignOut={onSignOut} />

        <Switch>
          {visible && <Spinner />}

          <ProtectedRoute
            component={Main}
            exact
            path='/'
            isLoggedIn={isLoggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCard={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCard}
          ></ProtectedRoute>

          <Route path='/sign-in'>
            {isLoggedIn ? (
              <Redirect to='/' />
            ) : (
              <Login onSignIn={handleSignIn} />
            )}
          </Route>

          <Route path='/sign-up'>
            {isLoggedIn ? (
              <Redirect to='/' />
            ) : (
              <Register onSignUp={handleSignUp} />
            )}
          </Route>

          <Route>
            {isLoggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
          </Route>
        </Switch>

        {isLoggedIn && (
          <>
            <Footer />

            <EditAvatarPopup
              isLoading={isLoading}
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <EditProfilePopup
              isLoading={isLoading}
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <AddPlacePopup
              isLoading={isLoading}
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <PopupWithForm
              title='Вы уверены?'
              name='deletecard'
              buttonText='Да'
              onClose={closeAllPopups}
            />

            <ImagePopup
              card={selectedCard}
              name='showelement'
              onClose={closeAllPopups}
            />
          </>
        )}

        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipPopupOpen}
          authorization={authorization}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
