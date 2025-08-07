/* eslint-disable react/prop-types */
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import TokenToName from '../components/Common/TokenToName';
import { showErrorSwal } from '../components/Login/showErrorSwal';
const PrivateRoute = ({ element, roles }) => {
  const tokenise = TokenToName();
  const navigate = useNavigate();
  if (!tokenise?.role) {
    showErrorSwal(navigate);
    return null;
  }
  if (roles && roles?.includes(tokenise?.role)) {
    return <Outlet />;
  }
  if (roles && !roles?.includes(tokenise?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return element;
};
export default PrivateRoute;
