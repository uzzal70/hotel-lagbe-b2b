import { Component } from 'react';
import Swal from 'sweetalert2';
import companyInfo from '../common/companyInfo';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.hasError && !prevState.hasError) {
      this.handleError();
    }
  }

  handleError = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${companyInfo.infoWrongtext}`,
      showConfirmButton: true,
    }).then(() => {
      this.handleLogout();
    });
  };

  handleLogout = () => {
    localStorage.removeItem('agentInfo');
    sessionStorage.removeItem('modalShownTime');
    sessionStorage.removeItem('modalShown');
    const navigate = useNavigate();
    navigate('/');
  };

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try again later.</div>;
    }

    return this.props?.children;
  }
}

export default ErrorBoundary;
