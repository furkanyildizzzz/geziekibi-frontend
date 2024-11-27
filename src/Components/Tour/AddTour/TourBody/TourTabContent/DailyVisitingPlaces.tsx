import PillInputComponent, {
  PillInputType,
} from "@/Components/Form&Table/Form/FormControls/Input/PillInputComponent";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
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
  const [dailyVisitingPlaces, setDailyVisitingPlaces] = useState<
    PillInputType[]
  >([]);

  const {
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<any>();

  const [editorKey, setEditorKey] = useState(0); // Key to force re-render

  const handleChange = (value: PillInputType) => {
    setDailyVisitingPlaces((prev) => {
      const updatedValues = [...prev, value];
      console.log({ prev, value, updatedValues });
      onFieldChange(formId, "dailyVisitingPlaces", [...updatedValues]);
      return updatedValues;
    });
  };

  const handleRemove = (pillToRemove: PillInputType) => {
    setDailyVisitingPlaces((prev) => {
      const updatedValues = prev.filter((value: { id: number; name: string }) =>
        pillToRemove.id > 0 // Remove edilecek kayıt yeniyse isimine bakarak kaldır.
          ? value.id !== pillToRemove.id
          : value.name !== pillToRemove.name
      );
      console.log({ prev, pillToRemove, updatedValues });
      onFieldChange(formId, "dailyVisitingPlaces", [...updatedValues]);
      return updatedValues;
    });
  };

  // useEffect(() => {
  //   setValue("dailyVisitingPlaces", dailyVisitingPlaces);
  //   onFieldChange(formId, "dailyVisitingPlaces", dailyVisitingPlaces);
  // }, [dailyVisitingPlaces]);

  useEffect(() => {
    setDailyVisitingPlaces(existingValues);
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
