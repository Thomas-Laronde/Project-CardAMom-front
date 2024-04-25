import React, { ChangeEvent, useState } from 'react';
import './Profile.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { AppDispatch, RootState } from '../../redux/store';
import { updateUser } from '../../redux/User/action';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import Footer from '../Footer/Footer';
import HomeButton from '../HomeButton/HomeButton';

function Profile() {
  const user = useAppSelector((state) => state.user.user);
  const [email, setEmail] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dispatch: AppDispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isConnected = useAppSelector(
    (store: RootState) => store.user.isConnected
  );
  //POur gérer la confirmation de changement par mot de passe
  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const passwordCheckHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(event.target.value);
  };

  //Fonction pour changer le username
  const profileHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPseudo(event.target.value);
  };
  //Fonction pour changer l'adresse mail
  const emailHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  //Fonction pour changer le mdp
  const passwordHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  //Fonction pour changer le mdp confirm
  const passwordConfirmHandleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(event.target.value);
  };

  const profileUpdate = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsModalOpen(!isModalOpen);
    if (password != passwordConfirm) {
      toast.error('les mots de passes sont différents');
      return;
    }
    dispatch(
      updateUser({
        email: email.trim() !== '' ? email : user?.email,
        password: password.trim() !== '' ? password : passwordCheck,
        pseudo: pseudo.trim() !== '' ? pseudo : user?.pseudo,
        id: user?.id,
      })
    );
  };

  // Fonction pour supprimer son compte
  // Fonction pour se deconnecter en retirant aussi le token du cookie
  const handleDisconnect = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    dispatch({ type: 'auth/DISCONNECT' });
    Cookies.remove('jwtToken');
    console.log('déconnecté', isConnected);
    toast.success('Vous avez bien été deconnecté');
  };
  //Fonction pour récupérer les stats:
  //  const getStats
  // Une div qui contient le nom du user, boutons deconnecter, un bouttons pour supprimer son compte, un input pour modifier,
  return (
    <main id="profil_page" className="profile_container">
      <AppHeader>
        <HomeButton />
      </AppHeader>
      <section className="profile-section">
        {isModalOpen ? (
          <>
            <input
              type="password"
              aria-label="passwordConfirm"
              className="profile-password"
              placeholder="Veuillez saisir votre mot de passe"
              value={passwordCheck}
              onChange={passwordCheckHandleChange}
            ></input>
            <button
              type="button"
              className="profile-button"
              onClick={profileUpdate}
            >
              Valider les changements
            </button>
          </>
        ) : (
          <section className="profile-section">
            <input
              type="text"
              aria-label="userName"
              className="profile-input"
              placeholder={user?.pseudo}
              value={pseudo}
              onChange={profileHandleChange}
            ></input>

            <input
              type="email"
              aria-label="mailAdress"
              className="profile-input"
              placeholder={user?.email}
              value={email}
              onChange={emailHandleChange}
            ></input>

            <input
              type="password"
              aria-label="password"
              className="profile-input"
              placeholder="changer de mot de passe"
              value={password}
              onChange={passwordHandleChange}
            ></input>

            <input
              type="password"
              aria-label="passwordConfirm"
              className="profile-input"
              placeholder="confirmer le mot de passe"
              value={passwordConfirm}
              onChange={passwordConfirmHandleChange}
            ></input>

            <button
              type="button"
              className="profile-button"
              onClick={handleOpenModal}
            >
              valider profil
            </button>
            <button type="button" className="profile-button">
              Supprimer le compte
            </button>
            <button
              type="button"
              className="profile-button"
              onClick={handleDisconnect}
            >
              Déconnexion
            </button>
          </section>
        )}
      </section>
      <section>
        <span>Affichage stats</span>
      </section>
      <Footer />
    </main>
  );
}

export default Profile;
