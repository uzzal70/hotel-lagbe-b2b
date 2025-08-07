// src/routes/MainRoutes.jsx
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import RootLoader from '../components/Common/RootLoader';
import PrivateRoute from './PrivateRoute';
import Reset from '../components/Login/Reset';
import Registration from '../components/Registration/Registration';
import Passenger from '../components/Test/Passenger';
import LazyDashboard from './LazyDashboard';
import Contact from '../Landing/Contact';
import AboutUs from '../Landing/AboutUs';
import Privacy from '../Landing/Privacy';
import RefundPolicy from '../Landing/RefundPolicy';
import Terms from '../Landing/Terms';
import PurchaseSale from '../Landing/PurchaseSale';
import NotFound from '../components/NotFound';
const LandingPage = lazy(() => import('../Landing/LandingPage'));
const MainRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const agentInfo = localStorage.getItem('agentInfo');

  useEffect(() => {
    if (location.pathname === '/') {
      const targetPath = agentInfo ? '/dashboard' : '/';
      navigate(targetPath);
    }
  }, [agentInfo, location.pathname, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<RootLoader />}>
            <LandingPage />
          </Suspense>
        }
      />
      <Route path="/resetpassword" element={<Reset />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/privacy-policy" element={<Privacy />} />
      <Route path="/terms-condition" element={<Terms />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
      <Route path="/purchase-policy" element={<PurchaseSale />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/test" element={<Passenger />} />

      {/* Private Routes */}
      <Route element={<PrivateRoute roles={['AGENT', 'AGENT_STAFF']} />}>
        <Route path="/dashboard/*" element={<LazyDashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
