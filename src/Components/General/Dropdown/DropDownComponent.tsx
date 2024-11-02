import { Col, Label, Row } from "reactstrap";
import { Typeahead, TypeaheadRef } from "react-bootstrap-typeahead";
import { ReactNode, useRef, useState } from "react";
import { Option } from "react-bootstrap-typeahead/types/types";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

interface DropDownComponentProps {
  id: string;
  title: ReactNode;
  labelKey: string;
  placeHolder: string | undefined;
  options: { name: string; id: string }[];
  selectedOption: Option[] | undefined;
  multiple: boolean | undefined;
  isRequired: boolean | undefined;
  onChange: Function | undefined;
}

const DropDownComponent: React.FC<DropDownComponentProps> = ({
  id,
  title,
  labelKey,
  options,
  selectedOption,
  multiple,
  isRequired,
  placeHolder,
  onChange,
}) => {
  const typeaheadRef = useRef<TypeaheadRef>(null);

  const [selectedState, setSelectedState] = useState<Option[] | undefined>(
    selectedOption
  );

  const handleBlur = () => {
    typeaheadRef.current?.hideMenu();
  };

  const handleChange = (selected: Option[]): void => {
    console.log({ selected });
    setSelectedState(selected);
    const id = selected.length
      ? (selected[0] as Record<string, any>["id"]).id
      : 0;
    console.log({ id });
    if (onChange) {
      onChange(id);
    }

    typeaheadRef.current!.getInput()!.value = id;
    typeaheadRef.current?.hideMenu();
  };

  return (
    <Row className="g-2 product-tag">
      <Col xs="12">
        <Label className="d-block m-0" for="validationServer01" check>
          {title}
          {isRequired && <span className="txt-danger"> *</span>}
        </Label>
      </Col>
      <Col xs="12">
        <i
          className="fa fa-angle-down"
          style={{
            textAlign: "center",
            width: "12px",
            lineHeight: "10px",
            zIndex: 1,
            position: "absolute",
            top: "50%",
            right: "2%",
          }}
        ></i>
        <Typeahead
          id={id}
          inputProps={{ id, name: id }}
          labelKey={labelKey}
          multiple={multiple}
          options={options}
          selected={selectedState || selectedOption}
          onChange={handleChange}
          ref={typeaheadRef}
          onBlur={handleBlur}
          // {...register}
        />
        {placeHolder && <p className="f-light">{placeHolder}</p>}
      </Col>
    </Row>
  );
};

export default DropDownComponent;
