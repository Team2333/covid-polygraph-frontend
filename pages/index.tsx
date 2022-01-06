import type { NextPage } from 'next';
import { DatePicker, Layout } from '@douyinfe/semi-ui';
import Header from '../components/header';
import Footer from '../components/footer';

const Home: NextPage = () => {
  const { Content } = Layout;

  return (
    <Layout style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      <Header />
      <Content
        style={{
          padding: '24px',
          backgroundColor: 'var(--semi-color-bg-0)',
          flex: 1,
        }}
      >
        <div
          style={{
            borderRadius: '10px',
            border: '1px solid var(--semi-color-border)',
            padding: '32px',
          }}
        >
          <DatePicker style={{ width: 250}} />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Home;
