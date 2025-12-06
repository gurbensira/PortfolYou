import { BrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import Router from './routes/Router';
import './App.css';
import UserProvider from './users/providers/UserProvider';

function App() {

  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Layout>
            <Router />
          </Layout>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App
