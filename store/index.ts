import { configureStore } from '@reduxjs/toolkit';
import config from './configSlice';

export default configureStore({
  reducer: {
    config,
  },
});

interface RootState {
  config: {
    darkMode: boolean,
    language: string,
  },
}

export type { RootState };
