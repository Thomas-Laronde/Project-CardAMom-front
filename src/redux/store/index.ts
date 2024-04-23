import { configureStore } from '@reduxjs/toolkit';
import settings from '../Settings';
import user from '../User';
import { deckListReducer } from '../Deck/reducer';
import { modalDeckReducer } from '../Deck/reducer';
import deckReducer from '../Card/reducer';
const store = configureStore({
  reducer: {
    settings: settings.reducer, // Reducer des settings (gestion de la modale pour inscription / connexion)
    decks: deckListReducer,
    modalDeck: modalDeckReducer,
    user: user.reducer, // Reducer pour la gestion de l'utilisateur
    deck: deckReducer,
  },
  devTools: true, // Mettre devTools sur true permet d'activer l'utilisation de l'extension chrome/firefox REDUX
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
