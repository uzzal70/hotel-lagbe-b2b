import { toast } from "react-toastify";
import Swal from "sweetalert2";


export const handlHotelReqBody = async ({
  label,
  param,
  hotelActionPost,
  bodyData,
  refetch,
  refetch1,
}) => {
  try {
    const { value: remarks, isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to ${label}?`,
      input: 'text',
      inputPlaceholder: 'Enter your remarks here...',
      inputAttributes: {
        'aria-label': 'Type your remarks here',
      },
      showCancelButton: true,
      confirmButtonText: 'Yes, Proceed!',
      cancelButtonText: 'Cancel',

      width: '350px',

      customClass: {
        confirmButton: 'cus-mui-btn-confirm',
        cancelButton: 'cus-mui-btn-cancel',
        input: 'cus-mui-input'
      },

      buttonsStyling: false,
    });

    if (isConfirmed) {
      const body = {
        ...bodyData,
        agentRemarks: remarks
      };

      try {
        const res = await hotelActionPost({ param, body }).unwrap();
        if (res?.booking?.status === "success") {
          toast.success(res?.booking?.message);
        } else {
          toast.error(res?.booking?.error);
        }
        refetch?.();
        refetch1?.();
      } catch (error) {
        console.error(error);
        toast.error(error?.data?.error || "An error occurred");
      }
    }
  } catch (error) {
    console.error("Something went wrong", error);
    toast.error('Something went wrong. Please try again.');
  }
};
