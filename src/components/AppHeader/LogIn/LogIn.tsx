import { ChangeEvent, useState, FormEvent } from 'react';
import './LogIn.scss';

import { IoIosCloseCircle } from 'react-icons/io';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../../../redux/store';
import { loginAction } from '../../../redux/User/action';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

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
  // Fonction pour se deconnecter en retirant aussi le token du cookie
  const handleDisconnect = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    dispatch({ type: 'auth/DISCONNECT' });
    Cookies.remove('jwtToken');
    console.log('déconnecté', isConnected);
    toast.success('Vous avez bien été deconnecté');
  };
  // fonction pour envoyer le formulaire de connection à la BDD

  const handleConnect = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      loginAction({
        email,
        password,
        pseudo: user?.pseudo,
        token: '',
        id: user?.id,
      })
    );
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
        <form>
          <h3 className="welcoming-message">
            <i>👋 Bienvenue {user?.pseudo}!</i>
          </h3>
          <button
            type="button"
            className="authentification-button"
            onClick={handleDisconnect}
          >
            Déconnexion
          </button>
        </form>
      ) : (
        <>
          {displayModalLogIn ? (
            <div id="Settings">
              <button id="closeButton" onClick={handleDialogDisplay}>
                <IoIosCloseCircle className="react_icon" />
              </button>
              <form onSubmit={handleConnect}>
                <input
                  type="email"
                  value={email}
                  onChange={emailHandleChange}
                  placeholder="Email"
                />
                <input
                  type="password"
                  value={password}
                  onChange={passwordHandleChange}
                  placeholder="Mot de passe"
                />
                <button type="submit">Envoyer</button>
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
