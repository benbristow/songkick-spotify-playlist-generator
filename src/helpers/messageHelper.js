import * as swal from 'sweetalert';

export const showError = (message) => {
    swal('Oops', message, 'error');
};