import PillInputComponent, {
  PillInputType,
} from "@/Components/Form&Table/Form/FormControls/Input/PillInputComponent";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Input, Label } from "reactstrap";
import { FormData } from "./TourSix";

interface DailyVisitingPlacesProps {
  formId: number;
  onFieldChange: (index: number, fieldName: keyof FormData, value: any) => void;
  existingValues: PillInputType[];
}

const DailyVisitingPlaces: React.FC<DailyVisitingPlacesProps> = ({
  formId,
  onFieldChange,
  existingValues,
}) => {
  const [dailyVisitingPlaces, setDailyVisitingPlaces] =
    useState<PillInputType[]>(existingValues);

  const {
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<any>();

  const [editorKey, setEditorKey] = useState(0); // Key to force re-render

  const handleChange = (value: PillInputType) => {
    console.log({ value });
    console.log({ dailyVisitingPlaces: getValues("dailyVisitingPlaces") });
    setDailyVisitingPlaces((prev) => [...prev, value]);
  };

  const handleRemove = (valueToRemove: string) => {
    console.log({ dailyVisitingPlaces: getValues("dailyVisitingPlaces") });
    setDailyVisitingPlaces((prev) =>
      prev.filter((value: { name: string }) => value.name !== valueToRemove)
    );
  };

  useEffect(() => {
    setValue("dailyVisitingPlaces", dailyVisitingPlaces);
    onFieldChange(formId, "dailyVisitingPlaces", dailyVisitingPlaces);
  }, [dailyVisitingPlaces]);

  useEffect(() => {
    if (editorKey < 2) setEditorKey((prev) => prev + 1); // Increment the key to force re-render
  }, [existingValues]);

  return (
    <PillInputComponent
      key={editorKey}
      title="Günün Gezi Noktaları"
      existingPills={existingValues}
      onChange={handleChange}
      onRemove={handleRemove}
    />
  );
};

export default DailyVisitingPlaces;
