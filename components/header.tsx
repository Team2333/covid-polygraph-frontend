import { useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleDarkMode, setLanguage } from '../store/configSlice';
import { Dropdown, Layout, Nav, Button, Popover } from '@douyinfe/semi-ui';
import { IconMoon, IconSun, IconLanguage } from '@douyinfe/semi-icons';
import logos from '../res/logos.json';
import { languageList } from '../lib/i18n';

const languages: Record<string, string> = {
  en_US: 'English (US)',
  zh_CN: '中文 (简体)',
  ja_JP: '日本語',
  ms_MY: 'Bahasa Melayu',
};

const setDarkMode = (darkMode: boolean) => {
  const root = document.documentElement;
  if (darkMode) {
    document.body.setAttribute('theme-mode', 'dark');
    root.style.setProperty('--para-color-p-0', 'hsl(0, 100%, 100%)');
    root.style.setProperty('--para-color-p-1', 'hsl(0, 100%, 80%)');
    root.style.setProperty('--para-color-p-2', 'hsl(0, 100%, 70%)');
    root.style.setProperty('--para-color-p-3', 'hsl(0, 100%, 65%)');
    root.style.setProperty('--para-color-p-4', 'hsl(0, 100%, 57%)');
    root.style.setProperty('--para-color-p-5', 'hsl(0, 100%, 50%)');
    root.style.setProperty('--para-color-n-0', 'hsl(0, 0%, 100%)');
    root.style.setProperty('--para-color-n-1', 'hsl(0, 0%, 80%)');
    root.style.setProperty('--para-color-n-2', 'hsl(0, 0%, 70%)');
    root.style.setProperty('--para-color-n-3', 'hsl(0, 0%, 65%)');
    root.style.setProperty('--para-color-n-4', 'hsl(0, 0%, 57%)');
    root.style.setProperty('--para-color-n-5', 'hsl(0, 0%, 50%)');
    root.style.setProperty('--paras-color-bg', '#2e2f34');
  } else {
    document.body.removeAttribute('theme-mode');
    root.style.setProperty('--para-color-p-0', 'hsl(0, 100%, 0%)');
    root.style.setProperty('--para-color-p-1', 'hsl(0, 100%, 20%)');
    root.style.setProperty('--para-color-p-2', 'hsl(0, 100%, 30%)');
    root.style.setProperty('--para-color-p-3', 'hsl(0, 100%, 35%)');
    root.style.setProperty('--para-color-p-4', 'hsl(0, 100%, 43%)');
    root.style.setProperty('--para-color-p-5', 'hsl(0, 100%, 50%)');
    root.style.setProperty('--para-color-n-0', 'hsl(0, 0%, 0%)');
    root.style.setProperty('--para-color-n-1', 'hsl(0, 0%, 20%)');
    root.style.setProperty('--para-color-n-2', 'hsl(0, 0%, 30%)');
    root.style.setProperty('--para-color-n-3', 'hsl(0, 0%, 35%)');
    root.style.setProperty('--para-color-n-4', 'hsl(0, 0%, 43%)');
    root.style.setProperty('--para-color-n-5', 'hsl(0, 0%, 50%)');
    root.style.setProperty('--paras-color-bg', '#f4f5f5');
  }
};

const Header = () => {
  const { Header } = Layout;

  const isDarkMode = useSelector((state: RootState) => state.config.darkMode);
  const language = useSelector((state: RootState) => state.config.language);
  const dispatch = useDispatch();

  useEffect(() => {
    setDarkMode(isDarkMode);
  }, [isDarkMode]);

  return (
    <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
      <Head>
        <title>Covid Polygraph</title>
        <meta name="description" content="Covid related fake news detection." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Nav mode="horizontal" defaultSelectedKeys={['Home']}>
          <Nav.Header>
            {
              isDarkMode ? (
                <img src={logos.dark}
                  alt="logo" style={{
                    width: '20%',
                    minWidth: '200px',
                  }} />
              ) : (
                <img src={logos.light}
                  alt="logo" style={{
                    width: '20%',
                    minWidth: '200px',
                  }} />
              )
            }
          </Nav.Header>
          <Nav.Footer>
            <Popover
              position="bottomRight"
              showArrow
              content={
                <article style={{
                  padding: 12,
                  color: 'var(--semi-color-text-1)',
                }}>
                  Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
                </article>
              }
            >
              <Button
                theme="borderless"
                icon={isDarkMode ? <IconSun size="large" /> : <IconMoon size="large" />}
                onClick={() => {
                  dispatch(toggleDarkMode());
                }}
                style={{
                  color: 'var(--semi-color-text-2)',
                  marginRight: '12px',
                }}
              />
            </Popover>
            <Dropdown
              render={
                <Dropdown.Menu>
                  {
                    Object.keys(languageList).map(x => (
                      <Dropdown.Item
                        disabled={language === x}
                        onClick={() => {
                          dispatch(setLanguage(x));
                        }}
                        key={x}
                      >
                        { languages[x] }
                      </Dropdown.Item>
                    ))
                  }
                </Dropdown.Menu>
              }
            >
              <Button
                theme="borderless"
                icon={<IconLanguage />}
                style={{
                  color: 'var(--semi-color-text-2)',
                  marginRight: '12px',
                }}
              />
            </Dropdown>
          </Nav.Footer>
        </Nav>
      </div>
    </Header>
  );
};

export default Header;
