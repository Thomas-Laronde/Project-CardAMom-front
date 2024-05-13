import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

type StatsActionPayload = {
  nb_card_consulted: number;
  nb_card_success: number;
  userId: number;
  deckId: number;
  id: number | undefined;
  statsId: number;
};

export const fetchStats = createAsyncThunk(
  'stats/FETCH_STATS',
  async (payload: StatsActionPayload) => {
    const token = Cookies.get('jwtToken');
    const id = payload.deckId;

    const response = await fetch(
      `http://localhost:3003/api/decks/${id}/stats`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const statsSend = await response.json();
    console.log('ppppppp==', response);
    console.log('les stast', statsSend);
    return statsSend;
  }
);
export const updateStats = createAsyncThunk(
  'stats/PATCH',
  async (payload: StatsActionPayload) => {
    const token = Cookies.get('jwtToken');
    const { deckId, statsId, nb_card_success } = payload;

    const id = payload.deckId;

    const response = await fetch(
      `http://localhost:3003/api/decks/${id}/stats`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    console.log('aaaaaaaaa===', response);
    const statsUpdated = await response.json();
    console.log('ssssssssss:', statsUpdated);
    return statsUpdated;
  }
);

export default { fetchStats, updateStats };
