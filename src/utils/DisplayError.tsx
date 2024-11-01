import { ErrorValidation } from "@/Types/ApiResponseType";
import { DeepMap, FieldError, FieldErrors, FieldValues } from "react-hook-form";

// Define the prop types for DisplayError
interface DisplayErrorProps {
  errorsValidation?: ErrorValidation[] | null;
  keyProp?: string; // Use a different name for the key prop to avoid conflicts with the special `key` in JSX
  errorMessage?: string | null;
  errors?: FieldErrors<FieldValues> | null;
}

const DisplayError: React.FC<DisplayErrorProps> = ({
  errorsValidation,
  keyProp,
  errorMessage,
  errors,
}) => {
  return (
    <>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {errorsValidation &&
        errorsValidation.length > 0 &&
        errorsValidation.map((errorObj, index) =>
          errorObj[keyProp!] ? (
            <p key={`${keyProp}-error-${index}`} style={{ color: "red" }}>
              {errorObj[keyProp!]}
            </p>
          ) : null
        )}
      {errors && errors[keyProp!] ? (
        <p key={`${keyProp}-error`} style={{ color: "red" }}>
          {(errors[keyProp!] as DeepMap<FieldValues, FieldError>).message}
        </p>
      ) : null}
    </>
  );
};

DisplayError.defaultProps = {
  errorsValidation: [],
  keyProp: "",
  errorMessage: "",
  errors: null,
};

export default DisplayError;
