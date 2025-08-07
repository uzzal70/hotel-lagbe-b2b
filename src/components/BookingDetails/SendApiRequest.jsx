import axios from 'axios';
import Swal from 'sweetalert2';

export const sendApiRequest = async ({ url, method, headers, payload }) => {
  try {
    const isConfirmed = await Swal.fire({
      title:
        '<div style="font-size: 10px; color: #ff0000;">Are you sure you want to cancel this booking?</div>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });

    const response = await axios({
      method,
      url,
      headers,
      data: payload,
    });

    if (response) {
      return response.data; // or whatever response data you want to handle
    } else {
      throw new Error(
        `Invalid status code: ${response ? response.status : 'unknown'}`
      );
    }
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
};
