import { createAction } from '@reduxjs/toolkit';

// Action pour afficher/cacher le modal de connexion
export const displayModalLogInAction = createAction('auth/DISPLAY_MODAL_LOGIN');
export const hideModalLogInAction = createAction('auth/HIDE_MODAL_LOGIN');

export const displayModalSignUpAction = createAction(
  'auth/DISPLAY_MODAL_SIGNUP'
);
export const hideModalSignUpAction = createAction('auth/HIDE_MODAL_SIGNUP');

export default {
  displayModalLogInAction,
  hideModalLogInAction,
  displayModalSignUpAction,
  hideModalSignUpAction,
};
