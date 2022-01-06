import '../styles/globals.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleDarkMode, setLanguage } from '../store/configSlice';
import type { AppProps } from 'next/app';
import store from '../store';
import { Provider as ReduxProvider } from 'react-redux';
import { LocaleProvider, ConfigProvider } from '@douyinfe/semi-ui';
import { getLocale } from '../lib/i18n';

function SubApp({ Component, pageProps }: any) {
  const language = useSelector((state: RootState) => state.config.language);
  const dispatch = useDispatch();

  // ugly hack to make sure the dark mode is applied for conditionally rendered items after the page is loaded
  useEffect(() => {
    setTimeout(() => {
      dispatch(toggleDarkMode());
      dispatch(toggleDarkMode());
      dispatch(setLanguage(''));
      dispatch(setLanguage(language));
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LocaleProvider locale={getLocale(language)}>
      <Component {...pageProps} />
    </LocaleProvider>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <SubApp Component={Component} pageProps={pageProps} />
    </ReduxProvider>
  );
}

export default MyApp;
