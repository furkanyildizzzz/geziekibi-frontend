import { ErrorValidation } from "@/Types/ApiResponseType";

// Define the prop types for DisplayError
interface DisplayErrorProps {
  errorsValidation: ErrorValidation[] | null;
  keyProp: string; // Use a different name for the key prop to avoid conflicts with the special `key` in JSX
}

const DisplayError: React.FC<DisplayErrorProps> = ({
  errorsValidation,
  keyProp,
}) => {
  return (
    <>
      {errorsValidation &&
        errorsValidation.length > 0 &&
        errorsValidation.map((errorObj, index) =>
          errorObj[keyProp] ? (
            <p key={`${keyProp}-error-${index}`} style={{ color: "red" }}>
              {errorObj[keyProp]}
            </p>
          ) : null
        )}
    </>
  );
};

export default DisplayError;
