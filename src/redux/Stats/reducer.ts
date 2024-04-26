import { createReducer } from '@reduxjs/toolkit';
import { fetchStats, updateStats } from './action';

type StatsState = {
  nb_card_consulted: number;
  nb_card_success: number;
  user_id: number;
  deck_id: number;
  id: number | undefined;
  isPending: boolean;
  error: string | null;
};
const initialState: StatsState = {
  nb_card_consulted: 0,
  nb_card_success: 0,
  user_id: 0,
  deck_id: 0,
  id: undefined,
  isPending: false,
  error: null,
};
const statsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchStats.pending, (state) => {
      state.isPending = true;
      state.error = null;
    })
    .addCase(fetchStats.fulfilled, (state, action) => {
      state.isPending = false;
      state.nb_card_consulted = action.payload.nb_card_consulted;
      state.nb_card_success = action.payload.nb_card_success;
      state.user_id = action.payload.user_id;
      state.deck_id = action.payload.deck_id;
      state.id = action.payload.id;
    })
    .addCase(fetchStats.rejected, (state, action) => {
      state.isPending = false;
      state.error = action.error.message ?? 'erreur';
    });
});
export default statsReducer;
