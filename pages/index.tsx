import type { NextPage } from 'next';
import { Layout } from '@douyinfe/semi-ui';
import Header from '../components/header';
import Footer from '../components/footer';
import Main from '../components/main';

const Home: NextPage = () => {
  return (
    <Layout style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      maxHeight: '100vh',
    }}>
      <Header />
      <Main />
      <Footer />
    </Layout>
  );
};

export default Home;
