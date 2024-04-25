import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const signUpAction = createAsyncThunk(
  'auth/SIGNUP',
  async (payload: LoginActionPayload) => {
    const response = await fetch(`http://localhost:3003/api/auth/signup`, {
      method: 'POST',
      headers: {
        // Je précise que j'envoie les données au format JSON
        'Content-Type': 'application/json',
      },
      // J'envoie les données de la liste au format JSON
      body: JSON.stringify(payload),
    });

    const userSend = await response.json();

    return userSend;
  }
);
