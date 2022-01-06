import { useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleDarkMode, setLanguage } from '../store/configSlice';
import { Dropdown, Layout, Nav, Button, Popover } from '@douyinfe/semi-ui';
import { IconMoon, IconSun, IconLanguage } from '@douyinfe/semi-icons';
import logos from '../res/logos.json';
import { languageList } from '../lib/i18n';

const Header = () => {
  const { Header } = Layout;

  const isDarkMode = useSelector((state: RootState) => state.config.darkMode);
  const language = useSelector((state: RootState) => state.config.language);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute('theme-mode', 'dark');
    } else {
      document.body.removeAttribute('theme-mode');
    }
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
                        {x}
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
