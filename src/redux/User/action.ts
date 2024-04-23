import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

type LoginActionPayload = {
  id: number | undefined;
  email: string;
  password: string;
  pseudo: string | undefined;
  token: string | undefined;
};
// Action pour se connecter
export const loginAction = createAsyncThunk(
  'auth/LOGIN',
  // J'envoie les informations saisies dans le formulaire de connection à l'API grâce au payload
  async (payload: LoginActionPayload) => {
    const response = await fetch(`http://localhost:3003/api/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const filteredResponse = await response.json();
    // récupérer la propriété token qui a été créée par le back et renvoyer dans filteredResponse
    const { token } = filteredResponse;

    if (token) {
      toast.success('Connection réussie');
      // Stocker le token dans les cookies
      Cookies.set('jwtToken', token, { expires: 1 }); // expire dans 7 jours
      return filteredResponse;
    }
    toast.error('Votre identifiant ou mot de passe sont incorrects');
  }
);
// Action pour se connecter si il y a un token
export const tokenLoginAction = createAsyncThunk(
  'auth/PROFILE',
  // J'envoie les informations saisies dans le formulaire de connection à l'API grâce au payload
  async (payload: LoginActionPayload) => {
    const { token } = payload;
    // message d'erreur si pas de token
    if (!token) {
      throw new Error('No token available');
    }
    try {
      const response = await fetch(`http://localhost:3003/api/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Ajouter le token JWT aux en-têtes
          Authorization: `Bearer ${token}`,
        },
      });
      // Gérer le cas où l'authentification échoue
      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }

      const userData = await response.json();

      toast.success('Connection réussie');
      return userData;
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de la connexion');
      throw error; // Propager l'erreur pour que le thunk puisse la capturer
    }
  }
);
// Action pour se déconnecter
export const disconnectAction = createAction('auth/DISCONNECT');

// Action pour s'inscrire
export const signUpAction = createAsyncThunk(
  'auth/SIGNUP',
  async (payload: LoginActionPayload) => {
    const response = await fetch(`http://localhost:3003/api/auth/signup`, {
      method: 'POST',
      headers: {
        // Je précise que j'envoie les données au format JSON
        'Content-Type': 'application/json',
      },
      // J'envoie les données de la liste au format JSON
      body: JSON.stringify(payload),
    });

    const userSend = await response.json();

    return userSend;
  }
);
export default {
  loginAction,
  disconnectAction,
  signUpAction,
  tokenLoginAction,
};
