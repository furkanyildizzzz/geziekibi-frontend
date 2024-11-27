import { Button, ButtonToolbar, Col, Label, Row } from "reactstrap";
import { Typeahead, TypeaheadRef } from "react-bootstrap-typeahead";
import {
  AddTag,
  ChooseATag,
  CreateNewTagHeading,
  Tours,
  ToursCanBeTagged,
} from "@/Constant/constant";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import { Option } from "react-bootstrap-typeahead/types/types";
import {
  ApiResponse,
  ErrorValidation,
  TagSuccessResponse,
  TourPathSuccessResponse,
} from "@/Types/ApiResponseType";
import { getTagList } from "@/app/actions/tag/getTagList";
import CreateNewTag from "@/Components/Tag/CreateNewTag";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { getTourPathList } from "@/app/actions/tour/tourPath/getTourPathList";
import { useFormContext } from "react-hook-form";
import DisplayError from "@/utils/DisplayError";
import { FormData } from "./TourSix";

interface SelectTourDailyPathProps {
  formId: number;
  onFieldChange: (index: number, fieldName: keyof FormData, value: any) => void;
  existingValues: { id: number; name: string }[];
}
const SelectTourDailyPath: React.FC<SelectTourDailyPathProps> = ({
  formId,
  onFieldChange,
  existingValues,
}) => {
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [dailyPaths, setDailyPaths] = useState<TourPathSuccessResponse[]>([]);
  const [existingDailyPaths, setExistingDailyPaths] =
    useState<TourPathSuccessResponse[]>(existingValues);

  const ref = useRef<TypeaheadRef>(null);

  const { isLoading } = useAppSelector((state) => state.addProduct);

  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation("common");

  const {
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<any>();

  const handleChange = (selected: Option[]) => {
    setValue("dailyPaths", selected);
    setExistingDailyPaths([...(selected as TourPathSuccessResponse[])]);
    onFieldChange(formId, "dailyPaths", [
      ...(selected as TourPathSuccessResponse[]),
    ]);
  };

  const handleClear = () => {
    ref.current?.clear();
    setValue("dailyPaths", []);
    setExistingDailyPaths([]);
  };

  const fetchTourPathList = async () => {
    const response: ApiResponse<TourPathSuccessResponse[]> =
      await getTourPathList();
    if ("data" in response) {
      setDailyPaths([...response.data]);
    }
  };

  useEffect(() => {
    console.log({ onFieldChange });
    fetchTourPathList();
  }, [pathname]);

  useEffect(() => {
    setExistingDailyPaths(existingValues);
  }, [existingValues]);

  const handleAdd = () => {
    router.push("/tour/tour-path/add-path");
  };

  return (
    <Col sm="12">
      <Row className="g-2 product-tag">
        <Col xs="12">
          <Label className="d-block m-0" for="validationServer01" check>
            {t("Select Path")}
            <span className="txt-danger"> *</span>
          </Label>
        </Col>
        <Col xs="12">
          <Typeahead
            // defaultSelected={MultiWithHeaderData.slice(0, 4)}
            id="public-methods-example"
            labelKey="name"
            multiple
            options={dailyPaths}
            onChange={handleChange}
            ref={ref}
            disabled={isLoading}
            selected={
              existingDailyPaths
                ? existingDailyPaths.map(
                    (path: { id: number; name: string }) => path
                  )
                : undefined
            }
            inputProps={{ style: { color: "red" } }}
          />
        </Col>
      </Row>
      <Row>
        <DisplayError errors={errors} />
      </Row>
      <Row>
        <ButtonToolbar
          className="mt-3"
          style={{ display: "flex", justifyContent: "flex-start", gap: "1%" }}
        >
          <Button type="button" onClick={handleClear} disabled={isLoading}>
            {t("Clear")}
          </Button>

          <Button
            color="transparent"
            tag="a"
            disabled={isLoading}
            className="button-primary bg-light-primary font-primary"
            onClick={handleAdd}
          >
            <i className="me-2 fa fa-plus"> </i>
            {t("Create New Path")}
          </Button>
        </ButtonToolbar>
      </Row>
    </Col>
  );
};

export default SelectTourDailyPath;
