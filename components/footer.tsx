import { Layout } from '@douyinfe/semi-ui';
import { useLocale } from '../lib/i18n';

const Footer = () => {
  const { Footer } = Layout;

  const locale = useLocale({
    copyrightStatement: {
      zh_CN: '版权 © 2022 Covid-Polygraph。 版权所有。',
      en_US: 'Copyright © 2022 Covid-Polygraph. All Rights Reserved.',
      ja_JP: '著作権 © 2022 Covid-Polygraph。全ての権利を有する。',
      ms_MY: 'Hak cipta © 2022 Covid-Polygraph. Semua hak cipta.',
    },
  }, 'en_US');

  return (
    <Footer
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
        color: 'var(--semi-color-text-2)',
        backgroundColor: 'rgba(var(--semi-grey-0), 1)',
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span>{ locale.copyrightStatement }</span>
      </span>
    </Footer>
  );
};

export default Footer;
