import { ChangeEvent, useState, FormEvent } from 'react';
import './LogIn.scss';
import { IoIosCloseCircle } from 'react-icons/io';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../../../redux/store';
import { loginAction } from '../../../redux/User/action';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/profile.png';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useAppSelector((store: RootState) => store.user);
  const token = Cookies.get('jwtToken');
  const dispatch: AppDispatch = useAppDispatch();
  const isConnected = useAppSelector(
    (store: RootState) => store.user.isConnected
  );
  const emailHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // fonction pour envoyer le formulaire de connection à la BDD

  const handleConnect = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      loginAction({
        email,
        password,
        pseudo: user?.pseudo,
        id: user?.id,
      })
    );
    dispatch({ type: 'auth/HIDE_MODAL_LOGIN' });
  };
  const { displayModalLogIn } = useAppSelector(
    (store: RootState) => store.settings
  );
  const handleDialogDisplay = () =>
    displayModalLogIn
      ? dispatch({ type: 'auth/HIDE_MODAL_LOGIN' })
      : dispatch({ type: 'auth/DISPLAY_MODAL_LOGIN' });

  return (
    <div>
      {token ? (
        <h3 className="welcoming-message">
          <Link to={`/profil/${user?.id}`}>
            <span className="link-user-pseudo ">
              Bienvenue {user?.pseudo} !{' '}
            </span>
            <img src={Logo} alt="Profile icon" className="user-icon" />
          </Link>
        </h3>
      ) : (
        <>
          {displayModalLogIn ? (
            <div id="Settings">
              <button id="closeButton" onClick={handleDialogDisplay}>
                <IoIosCloseCircle className="react_icon" />
              </button>
              <form className="form-container-login" onSubmit={handleConnect}>
                <input
                  className="input-login"
                  type="email"
                  value={email}
                  onChange={emailHandleChange}
                  placeholder="Email"
                />
                <input
                  className="input-login"
                  type="password"
                  value={password}
                  onChange={passwordHandleChange}
                  placeholder="Mot de passe"
                />
                <button className="valid-button" type="submit">
                  Envoyer
                </button>
              </form>
            </div>
          ) : (
            <button
              className="authentification-button"
              onClick={handleDialogDisplay}
            >
              {isConnected ? '' : 'LogIn'}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default LogIn;
