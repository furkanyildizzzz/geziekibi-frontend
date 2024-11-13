import { createNewTour } from "@/app/actions/tour/self/createNewTour";
import ShowValidationError from "@/CommonComponent/Toast/Error/ShowValidationError";
import SVG from "@/CommonComponent/SVG/Svg";
import { Loading, Next, Previous, Submit } from "@/Constant/constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {
  setFormValue,
  setNavId,
  setIsLoading,
  setTabId,
} from "@/Redux/Reducers/AddProductSlice";
import { Button } from "reactstrap";
import { editTour } from "@/app/actions/tour/self/editTour";
import { useEffect } from "react";
import { LoadingButton } from "@/Components/Button/Loading";
import { useTranslation } from "react-i18next";

const CommonButton = () => {
  const { navId, formValue, tabId, isLoading } = useAppSelector(
    (state) => state.addProduct
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");

  const handleNext = () => {
    console.log({ tabId, navId, formValue });
    if (!formValue.title || !formValue.spot) dispatch(setNavId(1));
    else if (!formValue.primaryImages.length) dispatch(setNavId(2));
    else if (
      !formValue.tourType ||
      !formValue.category ||
      !formValue.publishStatus
    )
      dispatch(setNavId(3));
    else if (!formValue.prices.length) dispatch(setNavId(4));
    dispatch(setNavId(5));
  };
  const handlePrevious = () => {
    if (navId > 1) {
      dispatch(setNavId(navId - 1));
    }
  };

  useEffect(() => {
    console.log({ formValue, isLoading });
  }, [isLoading]);

  const handleSubmit = async () => {
    dispatch(setIsLoading(true));
    try {
      // Create a 5-second delay
      // await new Promise((resolve) => setTimeout(resolve, 5000));
      // Place any actual submission logic here
      const response =
        formValue.id > 0
          ? await editTour(formValue.id, formValue)
          : await createNewTour(formValue);
      console.log({ response });
      if ("errorType" in response) {
        if (response.errorType == "Validation") {
          ShowValidationError(response.errorsValidation!);
        }
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="product-buttons border-0">
      {navId > 1 && (
        <Button
          color="transparent"
          disabled={isLoading}
          onClick={handlePrevious}
        >
          <div className="d-flex align-items-center gap-sm-2 gap-1">
            <SVG iconId="back-arrow" />
            {t("Previous")}
          </div>
        </Button>
      )}
      {navId === 5 ? (
        <Button
          color="transparent"
          className="ms-2"
          onClick={handleSubmit}
          type={"submit"}
          disabled={isLoading}
        >
          <div className="d-flex align-items-center gap-sm-2 gap-1">
            {isLoading ? <LoadingButton /> : t("Submit")}
          </div>
        </Button>
      ) : (
        <Button
          color="transparent"
          className="ms-2"
          onClick={handleNext}
          type={"button"}
          disabled={isLoading}
        >
          <div className="d-flex align-items-center gap-sm-2 gap-1">
            {t("Next")}
            <SVG iconId="front-arrow" />
          </div>
        </Button>
      )}
    </div>
  );
};

export default CommonButton;
