import { createReducer } from '@reduxjs/toolkit';
import {
  deleteCard,
  fetchCard,
  updateCard,
  cardCreate,
  updateDeck,
} from './action';
import { Deck } from '../../types';

type IdCardState = {
  deck: Deck | null;
  isPending: boolean;
  error: string | null;
};
const initialState: IdCardState = {
  deck: null,
  isPending: false,
  error: null,
};

const deckReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCard.pending, (state) => {
      state.isPending = true;
      state.error = null;
    })
    .addCase(fetchCard.fulfilled, (state, action) => {
      state.isPending = false;
      state.deck = action.payload;
    })
    .addCase(fetchCard.rejected, (state, action) => {
      state.isPending = false;
      state.error = action.error.message ?? 'erreur';
    })
    .addCase(cardCreate.fulfilled, (state, action) => {
      if (state.deck?.flashcards) {
        state.deck.flashcards.push(action.payload);
      }
    })
    .addCase(deleteCard.fulfilled, (state, action) => {
      if (state.deck?.flashcards) {
        const filteredFlashcards: any = state.deck.flashcards.filter(
          (card) => card.id !== action.payload
        );
        state.deck.flashcards = filteredFlashcards;
      }
    })
    .addCase(updateDeck.fulfilled, (state, action) => {
      state.deck = action.payload;
    })
    .addCase(updateCard.fulfilled, (state, action) => {
      const cardUpdate: any = action.payload;
      if (cardUpdate) {
        const cardToUpdate = state.deck?.flashcards?.find(
          (card: { id: any }) => card.id === cardUpdate.id
        );
        if (cardToUpdate) {
          cardToUpdate.title_front = cardUpdate.title_front;
          cardToUpdate.title_back = cardUpdate.title_back;
        }
      }
    });
});

export default deckReducer;
