import { ErrorValidation } from "@/Types/ApiResponseType";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
type FormValues = { [key: string]: any };

function useFormState(initialValues: FormValues = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorsValidation, setErrorsValidation] = useState<
    ErrorValidation[] | null
  >([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState<FormValues>(initialValues);

  // Toast for errorMessage updates
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [errorMessage]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    submitAction: (formData: FormData) => Promise<any> // Function to submit form data (like createNewTag)
  ) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorsValidation([]);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);

    try {
      console.log("Before running action  ");
      const response = await submitAction(formData);
      console.log({ response });

      if (response.errorMessage) {
        setIsSuccess(false);
        setErrorsValidation(response.errorsValidation);
        if (response.errorType === "Raw") {
          setErrorMessage(response.errorRaw.message);
        } else {
          setErrorMessage(response.errorMessage);
        }
      } else {
        setIsSuccess(true);
        toast.success(response.message, {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
    }

    setIsLoading(false);
  };

  const handleEditSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    submitAction: (id: number, formData: FormData) => Promise<any> // Function to submit form data (like createNewTag)
  ) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorsValidation([]);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const id = inputValues.id;
    try {
      const response = await submitAction(id, formData);
      if (response.errorMessage) {
        setIsSuccess(false);
        setErrorsValidation(response.errorsValidation);
        if (response.errorType === "Raw") {
          setErrorMessage(response.errorRaw.message);
        } else {
          setErrorMessage(response.errorMessage);
        }
      } else {
        setIsSuccess(true);
        toast.success(response.message, {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
    }

    setIsLoading(false);
  };
  const resetFormState = () => {
    setIsSuccess(false);
    setIsLoading(false);
    setErrorsValidation([]);
    setErrorMessage(null);
  };

  // Generic onChange handler
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Method to set initial form values, useful when opening an edit form

  const setFormValues = (values: FormValues) => {
    console.log({ values });
    const newValues = Object.entries(values).map(([key, value]) => ({
      [key]: value,
    }));

    console.log({ newValues });
    setInputValues(values);
  };

  return {
    isLoading,
    errorsValidation,
    errorMessage,
    isSuccess,
    inputValues,
    setFormValues,
    handleChange,
    handleSubmit,
    handleEditSubmit,
    resetFormState,
  };
}

export default useFormState;
