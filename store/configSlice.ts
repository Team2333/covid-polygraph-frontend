import { createSlice } from '@reduxjs/toolkit';

type ConfigState = {
  darkMode: boolean;
  language: string;
};

export const configSlice = createSlice({
  name: 'config',
  initialState: (
    process.browser && JSON.parse(localStorage.getItem('config') || '{}') ||
    {
      darkMode: false,
      language: 'en_US',
    }
  ) as ConfigState,
  reducers: {
    toggleDarkMode: (state) => {
      state.language = state.language || 'en_US';
      state.darkMode = !state.darkMode;
      localStorage.setItem('config', JSON.stringify(state));
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem('config', JSON.stringify(state));
    },
  },
});

export const { toggleDarkMode, setLanguage } = configSlice.actions;

export default configSlice.reducer;
