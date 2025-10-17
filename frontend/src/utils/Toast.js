// utils/toast.js
import { toast } from 'react-toastify';

// Custom toast configuration
const toastConfig = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  pauseOnFocusLoss:false,
};

// Toast utility functions
export const showSuccess = (message) => {
  toast.success(message, {
    ...toastConfig,
    className: 'custom-toast-success',
  });
};

export const showError = (message) => {
  toast.error(message, {
    ...toastConfig,
    className: 'custom-toast-error',
  });
};

export const showInfo = (message) => {
  toast.info(message, {
    ...toastConfig,
    className: 'custom-toast-info',
  });
};

export const showWarning = (message) => {
  toast.warning(message, {
    ...toastConfig,
    className: 'custom-toast-warning',
  });
};

// Optional: Custom toast with more control
export const showCustomToast = (message, type = 'default', options = {}) => {
  toast[type](message, {
    ...toastConfig,
    ...options,
  });
};