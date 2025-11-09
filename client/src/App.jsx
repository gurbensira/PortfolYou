import { BrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import Router from './routes/Router';
import './App.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App
