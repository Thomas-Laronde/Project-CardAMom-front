import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

type DeckActionPayload = {
  title: string;
  id: number | undefined;
  user_id?: number;
  shareId?: number;
  updated_at?: string;
};

export const fetchDeck = createAsyncThunk('decks/FETCH_DECK', async () => {
  const token = Cookies.get('jwtToken');
  const response = await fetch(`http://localhost:3003/api/decks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const parsedResponse = await response.json();
  return parsedResponse;
});

export const deckCreate = createAsyncThunk(
  'deck/CREATE',
  async (payload: DeckActionPayload) => {
    const token = Cookies.get('jwtToken');
    try {
      const response = await fetch(`http://localhost:3003/api/decks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const deckSend = await response.json();

      return deckSend;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteDeck = createAsyncThunk(
  'deck/DELETE',
  async (payload: DeckActionPayload) => {
    const token = Cookies.get('jwtToken');
    const { id } = payload;
    const response = await fetch(`http://localhost:3003/api/decks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Response status:', response.status);
    console.log(id);
    return null;
  }
);

export const updateDeckTitle = createAction('deck/UPDATETITLE');
export const fetchImportDeck = createAsyncThunk(
  'deck/FETCH_IMPORT_DECK',
  async (payload: DeckActionPayload) => {
    const { shareId } = payload;
    const token = Cookies.get('jwtToken');
    const response = await fetch(
      `http://localhost:3003/api/decks/share/${shareId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const parsedResponse = await response.json();

    return parsedResponse;
  }
);

export const openModal = createAction('modal/OPEN');
export const closeModal = createAction('modal/CLOSE');

export default {
  fetchDeck,
  openModal,
  closeModal,
  deckCreate,
  deleteDeck,
  fetchImportDeck,
  updateDeckTitle,
};
