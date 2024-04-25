import { createReducer } from '@reduxjs/toolkit';

type StatsState = {
  nb_card_consulted: number;
  nb_card_success: number;
  user_id: number;
  deck_id: number;
  id: number | undefined;
};
const initialState: StatsState = {
  nb_card_consulted: 0,
  nb_card_success: 0,
  user_id: 0,
  deck_id: 0,
  id: undefined,
};
const statsReducer = createReducer(initialState, (builder) => {
  builder;
});
export default statsReducer;
