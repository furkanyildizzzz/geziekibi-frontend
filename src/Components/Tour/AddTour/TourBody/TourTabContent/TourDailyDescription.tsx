"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import { Col } from "reactstrap";
import { useCallback, useEffect, useState } from "react";
import RichTextEditor2 from "@/Components/Editor/RichTextEditor2";
import { useFormContext } from "react-hook-form";

interface TourDailyDescriptionProps {
  formId: number;
  onFieldChange: Function;
  initialValue: string;
}

const TourDailyDescription: React.FC<TourDailyDescriptionProps> = ({
  formId,
  onFieldChange,
  initialValue,
}) => {
  const [editorKey, setEditorKey] = useState(0); // Key to force re-render

  const { getValues, setValue } = useFormContext<any>();
  const [incomingValue, setIncomingValue] = useState("");
  const handleChange = useCallback((value: string) => {
    setValue("description", value);
    onFieldChange(formId, "description", value);
  }, []);

  useEffect(() => {
    setIncomingValue(initialValue);
    if (editorKey < 2) setEditorKey((prev) => prev + 1); // Increment the key to force re-render
  }, [initialValue]);

  return (
    <Col xs="12">
      <div id="editor2">
        <RichTextEditor2
          key={editorKey} // Change the key to reset the editor
          initialValue={incomingValue}
          uploadFolderPath="/tour/daily/description"
          onChange={handleChange}
        />
      </div>
    </Col>
  );
};

export default TourDailyDescription;
