import 'react-toastify/dist/ReactToastify.css';

import { ReactText } from 'react';
import { toast, TypeOptions } from 'react-toastify';

interface Props {
  type?: TypeOptions;
  message: string;
}

function showToast({ type, message }: Props): ReactText {
  return toast(message, {
    type,
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export default showToast;
