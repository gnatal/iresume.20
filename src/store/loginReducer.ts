import { createSlice } from '@reduxjs/toolkit';
import { initialUserLoginState } from '../utils/DataTypes';

const userLoginSlice = createSlice({
  name: 'user',
  initialState: initialUserLoginState,
  reducers: {
    updateUserLogin: (state, action) => {
      state.user = action.payload
    },
    updateUserAuthCode: (state, action) => {
      console.log(`reducers.updateUserAuthCode: ${action.payload}`);
      state.spa.authCode = action.payload;
    },
    updateAuthSPA: (state, action) => {
      state.spa.authCodeUsed = action.payload.authCodeUsed;
      state.spa.pkce = action.payload.pkce;
      state.spa.pkceHash = action.payload.pkceHash;
      state.spa.authCode = action.payload.authCode;
    },
  },
});

export const { updateUserLogin, updateAuthSPA, updateUserAuthCode } = userLoginSlice.actions;
export const userLoginReducer = userLoginSlice.reducer;