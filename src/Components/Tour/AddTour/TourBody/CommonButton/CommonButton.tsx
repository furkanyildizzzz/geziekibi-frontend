import { createNewTour } from "@/app/actions/tour/self/createNewTour";
import SVG from "@/CommonComponent/SVG/Svg";
import { Next, Previous, Submit } from "@/Constant/constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setNavId, setTabId } from "@/Redux/Reducers/AddProductSlice";
import { Button } from "reactstrap";

const CommonButton = () => {
  const { navId, formValue, tabId } = useAppSelector(
    (state) => state.addProduct
  );
  const dispatch = useAppDispatch();

  const handleNext = () => {
    handleSubmit();

    // console.log({ tabId, navId, formValue });
    // if (!formValue.title || !formValue.spot) dispatch(setNavId(1));
    // else if (!formValue.image || !formValue.gallery) dispatch(setNavId(2));
    // else if (!formValue.category || !formValue.status) dispatch(setNavId(3));
    // else if (!formValue.initialPrice || !formValue.currency)
    //   dispatch(setNavId(4));
    // else if (
    //   !formValue.stock ||
    //   !formValue.lowStock ||
    //   !formValue.sku ||
    //   !formValue.quantity ||
    //   !formValue.restock
    // )
    //   dispatch(setNavId(5));
    // else {
    //   handleSubmit();
    // }
  };
  const handlePrevious = () => {
    if (navId > 1) {
      if (tabId > 1) {
        dispatch(setTabId(tabId - 1));
      } else {
        dispatch(setNavId(navId - 1));
      }
    }
  };

  const handleSubmit = async () => {
    // // Create a new FormData instance
    // const formData = new FormData();

    // // Append each entry of formValues to formData, with special handling for arrays and objects
    // Object.entries(formValue).forEach(([key, value]: [string, any]) => {
    //   if (value instanceof Date) {
    //     // If the value is a Date object, convert it to an ISO string
    //     formData.append(key, value.toISOString()); // e.g., "2023-11-06T12:34:56.789Z"
    //   } else if (key === "image") {
    //     formData.append(key, value);
    //   } else if (key === "gallery" && value.length) {
    //     for (let index = 0; index < value.length; index++) {
    //       const file = value[index];
    //       formData.append(key, file);
    //     }
    //   } else if (typeof value === "object" && value !== null) {
    //     // Convert arrays or objects to JSON strings
    //     formData.append(key, JSON.stringify(value));
    //   } else {
    //     // Append simple key-value pairs as-is
    //     formData.append(key, value);
    //   }
    // });
    console.log({ formValue });

    const response = await createNewTour(formValue);
    console.log({ response });

    // if ("errorType" in response) {
    //   if (response.errorType == "Validation")
    //     setErrorsValidation(response.errorsValidation!);
    //   else setErrorMessage(response.errorMessage);
    // }
  };

  return (
    <div className="product-buttons border-0">
      {navId > 1 && (
        <Button color="transparent" onClick={handlePrevious}>
          <div className="d-flex align-items-center gap-sm-2 gap-1">
            <SVG iconId="back-arrow" />
            {Previous}
          </div>
        </Button>
      )}
      <Button
        color="transparent"
        className="ms-2"
        onClick={handleNext}
        type={navId === 5 ? "button" : "submit"}
      >
        <div className="d-flex align-items-center gap-sm-2 gap-1">
          {navId === 5 ? Submit : Next}
          <SVG iconId="front-arrow" />
        </div>
      </Button>
    </div>
  );
};

export default CommonButton;
