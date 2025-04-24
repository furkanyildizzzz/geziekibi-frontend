import { Button, ButtonToolbar, Col, Label, Row } from "reactstrap";
import { Typeahead, TypeaheadRef } from "react-bootstrap-typeahead";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/Redux/Hooks";
import { Option } from "react-bootstrap-typeahead/types/types";
import {
  ApiResponse,
  ErrorValidation,
  TagSuccessResponse,
} from "@/Types/ApiResponseType";
import { getTagList } from "@/app/actions/tag/getTagList";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface DropdownTagComponentProps {
  onChange: (selected: Option[]) => void;
  incomingTags: Option[] | undefined;
}

const DropdownTagComponent: React.FC<DropdownTagComponentProps> = ({
  onChange,
  incomingTags,
}) => {
  const [tags, setTags] = useState<TagSuccessResponse[]>([]);
  const [existingTags, setExistingTags] = useState<Option[] | undefined>(
    incomingTags
  );
  const ref = useRef<TypeaheadRef>(null);

  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation("common");

  const handleChange = (selected: Option[]) => {
    onChange(selected);
    setExistingTags(selected);
  };

  const fetchTagList = async () => {
    const response: ApiResponse<TagSuccessResponse[]> = await getTagList();
    if ("data" in response) {
      setTags([...response.data]);
    }
  };

  useEffect(() => {
    fetchTagList();
  }, [pathname]);

  const handleAdd = () => {
    router.push("/tags/add-tag");
  };

  return (
    <Col sm="12">
      <Row className="g-2 product-tag">
        <Col xs="12">
          <Label className="d-block m-0" for="validationServer01" check>
            {t("SelectTag")}
          </Label>
        </Col>
        <Col xs="12">
          <Typeahead
            // defaultSelected={MultiWithHeaderData.slice(0, 4)}
            id="public-methods-example"
            labelKey="name"
            multiple
            options={tags}
            onChange={handleChange}
            ref={ref}
            selected={existingTags}
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="6">
          <ButtonToolbar className="mt-3">
            <Button onClick={() => ref.current?.clear()}>{t("Clear")}</Button>
          </ButtonToolbar>
        </Col>
        <Col xs="12" sm="6">
          <Button
            color="transparent"
            tag="a"
            className="button-primary bg-light-primary font-primary"
            onClick={handleAdd}
            style={{ width: "100%", padding: "10px" }}
          >
            <i className="me-2 fa fa-plus"> </i>
            {t("CreateNewTagHeading")}
          </Button>
        </Col>
      </Row>
    </Col>
  );
};

export default DropdownTagComponent;
