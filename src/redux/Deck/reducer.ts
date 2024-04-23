import { createReducer } from '@reduxjs/toolkit';
import { fetchDeck, updateDeckTitle } from './action';
import { Deck } from '../../types';
import { closeModal, openModal } from './action';
import { deckCreate } from './action';
import { fetchImportDeck } from './action';

type IdDeckState = {
  list: Deck[];
  isPending: boolean;
  error: string | null;
};

const initialState: IdDeckState = {
  list: [],
  isPending: false,
  error: null,
};

const stateInitial = {
  isModalOpen: false,
};

const deckListReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchDeck.pending, (state) => {
      state.isPending = true;
      state.error = null;
    })
    .addCase(fetchDeck.fulfilled, (state, action) => {
      state.isPending = false;
      state.list = action.payload;
    })
    .addCase(fetchDeck.rejected, (state, action) => {
      state.isPending = false;
      state.error = action.error.message ?? 'erreur';
    })
    .addCase(deckCreate.fulfilled, (state, action) => {
      const newDeck = action.payload;

      state.list.push(newDeck);
    })
    .addCase(fetchImportDeck.fulfilled, (state, action) => {
      state.isPending = false;
      state.list.push(action.payload);
      console.log(state.error, " pas l'erreur ici");
    })
    .addCase(fetchImportDeck.rejected, (state, action) => {
      state.isPending = false;
      state.error = action.error.message ?? 'erreur';
      console.log(state.error, "l'erreur ici");
    })
    .addCase(updateDeckTitle, (state, action) => {
      const deckUpdate: any = action.payload;
      if (deckUpdate) {
        const deckToUpdate = state.list.find(
          (deck) => deck.id === deckUpdate.id
        );
        if (deckToUpdate) {
          deckToUpdate.title = deckUpdate.title;
        }
      }
    });
});

const modalDeckReducer = createReducer(stateInitial, (builder) => {
  builder
    .addCase(openModal, (state) => {
      state.isModalOpen = true;
    })
    .addCase(closeModal, (state) => {
      state.isModalOpen = false;
    });
});

export { deckListReducer, modalDeckReducer };
