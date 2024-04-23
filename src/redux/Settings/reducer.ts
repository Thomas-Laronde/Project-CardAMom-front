import { createReducer } from '@reduxjs/toolkit';
import { SettingsState } from '../../types';
import actions from './action';

const initialState: SettingsState = {
  displayModalLogIn: false,
  displayModalSignUp: false,
};

const settingsReducer = createReducer(initialState, (builder) => {
  builder
    //cacher la modale
    .addCase(actions.hideModalLogInAction, (state, action) => {
      state.displayModalLogIn = false;
    })
    .addCase(actions.hideModalSignUpAction, (state, action) => {
      state.displayModalSignUp = false;
    })
    //afficher la modale
    .addCase(actions.displayModalLogInAction, (state, action) => {
      state.displayModalLogIn = true;
    })
    .addCase(actions.displayModalSignUpAction, (state, action) => {
      state.displayModalSignUp = true;
    });
});

export default settingsReducer;
