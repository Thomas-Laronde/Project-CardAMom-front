import { ChangeEvent, useState } from 'react';
import './SignUp.scss';
import { IoIosCloseCircle } from 'react-icons/io';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { RootState } from '../../../redux/store';
import { signUpAction } from '../../../redux/User/action';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const token = Cookies.get('jwtToken');
  const dispatch = useAppDispatch();

  const emailHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const newPasswordHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const pseudoHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPseudo(event.target.value);
  };
  // Confirmation de mot de passe
  const handlePasswordCheck = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    password !== newPassword
      ? toast.error('Les mots de passe ne correspondent pas')
      : handleSingUp(event);
  };
  // Création compte user
  const handleSingUp = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password || !pseudo || !newPassword) {
      toast.error('Veuillez remplir tous les champs.');
      return;
    }

    setEmail('');
    setPseudo('');
    setPassword('');
    setNewPassword('');
    dispatch(
      signUpAction({
        email,
        password,
        pseudo,
        token: '',
        id: 0,
      })
    );
    toast.success('Votre compte a bien été créé');
    dispatch({ type: 'auth/HIDE_MODAL_SIGNUP' });
  };

  const { displayModalSignUp } = useAppSelector(
    (store: RootState) => store.settings
  );

  const handleDialogDisplay = () =>
    displayModalSignUp
      ? dispatch({ type: 'auth/HIDE_MODAL_SIGNUP' })
      : dispatch({ type: 'auth/DISPLAY_MODAL_SIGNUP' });

  return (
    <>
      {token ? (
        ''
      ) : (
        <>
          {displayModalSignUp ? (
            <div id="Settings">
              <button id="closeButton" onClick={handleDialogDisplay}>
                <IoIosCloseCircle className="react_icon" />
              </button>
              <form onSubmit={handlePasswordCheck}>
                <input
                  type="text"
                  value={pseudo}
                  onChange={pseudoHandleChange}
                  placeholder="Pseudo"
                />
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
                <input
                  type="password"
                  value={newPassword}
                  onChange={newPasswordHandleChange}
                  placeholder="Confirmer le mot de passe"
                />
                <button type="submit">Créer un compte</button>
              </form>
            </div>
          ) : (
            <button
              type="button"
              className="authentification-button"
              onClick={handleDialogDisplay}
            >
              Sign Up
            </button>
          )}
        </>
      )}
    </>
  );
}

export default SignUp;
