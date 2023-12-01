import { createSlice } from "@reduxjs/toolkit";
import i18n from "../i18n/i18n";

const appLanguageSlice = createSlice({
  name: "appLanguage",
  initialState: {
    value: "en",
  },
  reducers: {
    setLanguage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLanguage } = appLanguageSlice.actions;
export const appLanguageReducer = appLanguageSlice.reducer;
