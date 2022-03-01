import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

export default {
  methods: {
    // alert message success，sweet alert
    alertSuccess(msg) {
      const swalSuccess = Swal.mixin({
        color: '#198754',
        confirmButtonColor: '#dc3545',
      });
      swalSuccess.fire({
        icon: 'success',
        title: msg,
        // text: 'Something went wrong!',
      });
    },

    // alert message error，sweet alert
    alertError(msg) {
      const swalError = Swal.mixin({
        color: '#495371',
        confirmButtonColor: '#dc3545',
      });
      swalError.fire({
        icon: 'error',
        title: msg,
        // text: 'Something went wrong!',
      });
    },
  },
};
