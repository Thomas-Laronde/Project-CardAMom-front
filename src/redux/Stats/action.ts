import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

type StatsActionPayload = {
  nb_card_consulted: number;
  nb_card_success: number;
  user_id: number;
  deck_id: number;
  id: number | undefined;
};
export const fetchStats = createAsyncThunk(
  'stats/FETCH_STATS',
  async (payload: StatsActionPayload) => {
    const token = Cookies.get('jwtToken');
    const { deck_id } = payload;
    const response = await fetch(
      `http://localhost:3003/api/decks/${deck_id}/stats`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(payload),
      }
    );
    const statsSend = await response.json();
    return statsSend;
  }
);
export const updateStats = createAsyncThunk(
  'stats/PATCH',
  async (payload: any) => {
    const { token, id } = payload;
    const response = await fetch(`http://localhost:3003/api/decks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const statsUpdated = await response.json();
    return statsUpdated;
  }
);

export default { fetchStats, updateStats };
