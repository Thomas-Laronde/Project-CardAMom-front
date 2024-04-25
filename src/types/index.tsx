export type SettingsState = {
  displayModalLogIn: boolean;
  displayModalSignUp: boolean;
};
export type UserState = {
  isConnected: boolean;
  isRegistered: boolean;
  errorMessage: string;
  isPending: boolean;
  user?: UserData;
};
export type UserData = {
  id: number;
  password: string;
  email: string;
  pseudo: string;
};

export type Deck = {
  id: number;
  title: string;
  share_id: string;
  flashcards?: [Card];
  user_id: number;
};
export type Card = {
  id: number;
  title_front: string;
  title_back: string;
  deck_id: number;
};
