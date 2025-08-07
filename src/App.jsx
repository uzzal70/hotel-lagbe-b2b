import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './routes/MainRoutes';
import ScrollToTop from './ScrollToTop';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <MainRoutes />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
