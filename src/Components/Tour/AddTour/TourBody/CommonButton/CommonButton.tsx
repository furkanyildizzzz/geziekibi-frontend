import { createNewTour } from "@/app/actions/tour/self/createNewTour";
import ShowValidationError from "@/Components/Toast/Error/ShowValidationError";
import SVG from "@/Components/SVG/Svg";
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
import ShowError from "@/Components/Toast/Error/ShowError";
import ShowSuccess from "@/Components/Toast/Success/ShowSuccess";
import { deleteTour } from "@/app/actions/tour/self/deleteTour";
import { useRouter } from "next/navigation";

const CommonButton = () => {
  const { navId, formValue, tabId, isLoading } = useAppSelector(
    (state) => state.addProduct
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");

  const router = useRouter();

  const handleNext = () => {
    console.log({ tabId, navId, formValue });
    if (!formValue.title || !formValue.spot) dispatch(setNavId(1));
    else if (
      !formValue.uploadedPrimaryImages.length &&
      formValue.primaryImages.length === 0
    )
      dispatch(setNavId(2));
    else if (
      formValue.dailyForms.length === 0 ||
      !formValue.dailyForms.dailyPaths ||
      formValue.dailyForms.dailyPaths.length === 0
    )
      dispatch(setTabId(3));
    else if (
      !formValue.tourType ||
      !formValue.category ||
      !formValue.publishStatus
    )
      dispatch(setNavId(4));
    else if (!formValue.prices.length) dispatch(setNavId(5));
    else dispatch(setNavId(6));
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
    let tourId = formValue.id;
    console.log({ formValue });
    try {
      const response =
        tourId > 0
          ? await editTour(formValue.id, formValue)
          : await createNewTour(formValue);
      console.log({ response });
      if ("errorType" in response) {
        ShowValidationError(response.errorsValidation!);
        ShowError(response.errorMessage);
      } else {
        ShowSuccess(response.message);
        tourId = response.data.id;
        dispatch(setNavId(1));
        handleReload(`/tour/${tourId}`);
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(`Are you sure you want to delete:\r ${formValue.title} ?`)
    ) {
      try {
        dispatch(setIsLoading(true));

        await deleteTour(formValue.id);
      } catch (error) {
        ShowError("Failed to delete tour. Please try again.");
      } finally {
        dispatch(setIsLoading(false));
        handleReload("/tours");
      }
    }
  };

  const handleReload = (path: string) => {
    router.replace(path); // Reloads the current page
  };

  return (
    <div
      className="product-buttons border-0"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>
        {navId === 6 && formValue.id > 0 && (
          <Button
            color="danger"
            className="ms-2"
            onClick={handleDelete}
            type={"button"}
            disabled={isLoading}
          >
            <div className="d-flex align-items-center gap-sm-2 gap-1">
              {t("Delete")}
            </div>
          </Button>
        )}
      </div>
      <div>
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
        {navId === 6 ? (
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
    </div>
  );
};

export default CommonButton;
