import { toast } from "react-toastify";

const ShowError = (t: (key: string) => string, message: string) => {
  if (!message) return;

  toast.error(t(message), {
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
export default ShowError;
