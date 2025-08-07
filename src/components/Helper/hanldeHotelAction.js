import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const hanldeHotelAction = async ({
    param,
    hotelActionPatch,
    refetch,
    refetch1,
    refetch2,
    actionType,
}) => {

    const isApprove = actionType === ('APPROVED');
    const { value: remarks, isConfirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: isApprove
            ? 'Do you really want to Approve?'
            : 'Do you really want to Decline?',
        input: 'text',
        inputPlaceholder: 'Enter your remarks here...',
        inputAttributes: {
            'aria-label': 'Type your remarks here',
        },

        showCancelButton: true,
        confirmButtonText: isApprove ? 'Yes, Approve it!' : 'Yes, Decline it!',
        cancelButtonText: 'Cancel',

        width: '350px',

        customClass: {
            confirmButton: 'cus-mui-btn-confirm',
            cancelButton: 'cus-mui-btn-cancel',
            input: 'cus-mui-input'
        },
    });

    if (isConfirmed) {
        const params = `${param}&remarks=${remarks}`;
        try {
            await hotelActionPatch(params).unwrap();
            toast.success(
                isApprove
                    ? 'Successfully Approved!'
                    : 'Successfully Declined!'
            );
            refetch?.();
            refetch1?.();
            refetch2?.();
        } catch (error) {
            toast.error(
                error?.data.error || error?.data.message
            );
        }
    }
};


