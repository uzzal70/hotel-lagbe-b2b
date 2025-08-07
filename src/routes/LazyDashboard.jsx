// src/routes/LazyDashboard.jsx
import { Suspense, lazy } from 'react';
import RootLoader from '../components/Common/RootLoader';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-input-2/lib/style.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
const DashboardRoutes = lazy(() => import('./DashboardRoutes'));

const LazyDashboard = () => {
  return (
    <Suspense fallback={<RootLoader />}>
      <DashboardRoutes />
    </Suspense>
  );
};

export default LazyDashboard;
