import Swal from 'sweetalert2';
import companyInfo from '../../common/companyInfo';

export const showErrorSwal = (navigate) => {
  const handleLogout = () => {
    localStorage.removeItem('agentInfo');
    sessionStorage.removeItem('modalShownTime');
    sessionStorage.removeItem('modalShown');
    navigate('/');
  };

  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: `${companyInfo.infoWrongtext}`,
    showConfirmButton: true,
  }).then(() => {
    handleLogout();
  });
};
