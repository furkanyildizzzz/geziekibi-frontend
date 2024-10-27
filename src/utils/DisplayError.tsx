import { ErrorValidation } from "@/Types/ApiResponseType";

// Define the prop types for DisplayError
interface DisplayErrorProps {
  errorsValidation?: ErrorValidation[] | null;
  keyProp?: string; // Use a different name for the key prop to avoid conflicts with the special `key` in JSX
  errorMessage?: string | null;
}

const DisplayError: React.FC<DisplayErrorProps> = ({
  errorsValidation,
  keyProp,
  errorMessage,
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
    </>
  );
};

DisplayError.defaultProps = {
  errorsValidation: [],
  keyProp: "",
  errorMessage: "",
};

export default DisplayError;
