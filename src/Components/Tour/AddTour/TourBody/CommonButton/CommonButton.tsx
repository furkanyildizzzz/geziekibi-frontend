import { createNewTour } from "@/app/actions/tour/self/createNewTour";
import ShowValidationError from "@/CommonComponent/Toast/Error/ShowValidationError";
import SVG from "@/CommonComponent/SVG/Svg";
import { Next, Previous, Submit } from "@/Constant/constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setNavId, setTabId } from "@/Redux/Reducers/AddProductSlice";
import { Button } from "reactstrap";
import { editTour } from "@/app/actions/tour/self/editTour";

const CommonButton = () => {
  const { navId, formValue, tabId } = useAppSelector(
    (state) => state.addProduct
  );
  const dispatch = useAppDispatch();

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

  const handleSubmit = async () => {
    console.log({ formValue });

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
      {navId === 5 ? (
        <Button
          color="transparent"
          className="ms-2"
          onClick={handleSubmit}
          type={"submit"}
        >
          <div className="d-flex align-items-center gap-sm-2 gap-1">
            {Submit}
            <SVG iconId="front-arrow" />
          </div>
        </Button>
      ) : (
        <Button
          color="transparent"
          className="ms-2"
          onClick={handleNext}
          type={"button"}
        >
          <div className="d-flex align-items-center gap-sm-2 gap-1">
            {Next}
            <SVG iconId="front-arrow" />
          </div>
        </Button>
      )}
    </div>
  );
};

export default CommonButton;
