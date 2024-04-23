import { createReducer } from '@reduxjs/toolkit';
import { UserState } from '../../types';
import actions from './action';

const initialState: UserState = {
  isConnected: false,
  isRegistered: false,
  errorMessage: '',
  isPending: false,
  user: {
    id: 0,
    email: '',
    password: '',
    pseudo: '',
    token: '',
  },
};

const userReducer = createReducer(initialState, (builder) => {
  builder

    //Attente de connexion à l'API
    .addCase(actions.loginAction.pending, (state) => {
      console.info('Connexion en cours...');
      state.isPending = true;
    })
    // si authentification avec le token réussi
    .addCase(actions.tokenLoginAction.fulfilled, (state, action) => {
      state.isPending = false;
      state.isConnected = true;
      state.user = action.payload.user;
    })

    // authentification rejetée avec token

    //si authentification est réussie
    .addCase(actions.loginAction.fulfilled, (state, action) => {
      state.isPending = false;
      state.isConnected = true;
      state.user = action.payload.user;
    })
    //si authentifiaction a échoué
    .addCase(actions.loginAction.rejected, (state, action) => {
      state.isPending = false;
      state.isConnected = false;
      state.errorMessage = action.error.message || 'erreur';
    })
    // Si deconnexion de l'utilisateur
    .addCase(actions.disconnectAction, (state, action) => {
      state.isConnected = false;
    })
    //Si inscription réussie
    .addCase(actions.signUpAction.fulfilled, (state, action) => {
      state.isRegistered = true;
    })
    //Si inscription ne réussie pas
    .addCase(actions.signUpAction.rejected, (state, action) => {
      state.isRegistered = false;
      state.errorMessage = action.error.message || `erreur d'inscription`;
    });
});

export default userReducer;
