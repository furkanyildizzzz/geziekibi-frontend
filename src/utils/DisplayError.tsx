import { ErrorValidation } from "@/Types/ApiResponseType";
import { DeepMap, FieldError, FieldErrors, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";

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
  // console.log({ errorsValidation, keyProp, errorMessage, errors });
  const { t } = useTranslation("form");

  return (
    <>
      {errorMessage && <p style={{ color: "red" }}>{t(errorMessage)}</p>}
      {errorsValidation &&
        errorsValidation.length > 0 &&
        errorsValidation.map((errorObj, index) =>
          errorObj[keyProp!] ? (
            <p key={`${keyProp}-error-${index}`} style={{ color: "red" }}>
              {t(errorObj[keyProp!])}
            </p>
          ) : null
        )}
      {errors && errors[keyProp!] ? (
        <p key={`${keyProp}-error`} style={{ color: "red" }}>
          {t((errors[keyProp!] as DeepMap<FieldValues, FieldError>).message)}
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
