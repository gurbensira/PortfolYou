import { BrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import Router from './routes/Router';
import './App.css';
import UserProvider from './users/providers/UserProvider';
import { SnackbarProvider } from './providers/SnackbarProvider';

function App() {

  return (
    <>
    <SnackbarProvider>
      <UserProvider>
        <BrowserRouter>
          <Layout>
            <Router />
          </Layout>
        </BrowserRouter>
      </UserProvider>
      </SnackbarProvider>
    </>
  );
}

export default App
