import { createReducer } from '@reduxjs/toolkit';
import { fetchStats, updateStats } from './action';

type StatsState = {
  nb_card_consulted: number;
  nb_card_success: number;
  userId: number;
  deckId: number;
  id: number | undefined;
  isPending: boolean;
  error: string | null;
};
const initialState: StatsState = {
  nb_card_consulted: 0,
  nb_card_success: 0,
  userId: 0,
  deckId: 0,
  id: 0,
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
      console.log('Stats fetch:', action.payload);

      state.nb_card_consulted = action.payload.nb_card_consulted;
      state.nb_card_success = action.payload.nb_card_success;
      state.userId = action.payload.user_id;
      state.deckId = action.payload.deck_id;
      state.id = action.payload.id;
    })
    .addCase(fetchStats.rejected, (state, action) => {
      state.isPending = false;
      state.error = action.error.message ?? 'erreur';
    })
    .addCase(updateStats.pending, (state) => {
      state.isPending = true;
      state.error = null;
    })
    .addCase(updateStats.fulfilled, (state, action) => {
      state.isPending = false;
      state.nb_card_consulted = action.payload.nb_card_consulted;
      state.nb_card_success = action.payload.nb_card_success;
      state.userId = action.payload.user_id;
      state.deckId = action.payload.deck_id;
      state.id = action.payload.id;
    })
    .addCase(updateStats.rejected, (state, action) => {
      state.isPending = false;
      state.error = action.error.message ?? 'erreur';
    });
});
export default statsReducer;
