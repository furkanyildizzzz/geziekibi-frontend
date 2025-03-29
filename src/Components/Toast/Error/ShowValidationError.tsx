import { ErrorValidation } from "@/Types/ApiResponseType";
import { toast } from "react-toastify";

const ShowValidationErrors = (
  t: (key: string) => string,
  errorsValidation: ErrorValidation[]
) => {
  if (!errorsValidation || errorsValidation.length === 0) return;

  errorsValidation.forEach((error) => {
    const [field, message] = Object.entries(error)[0];
    toast.error(t(message), {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  });
};
export default ShowValidationErrors;
