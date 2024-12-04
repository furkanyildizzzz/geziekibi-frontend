import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Input, Label } from "reactstrap";

export type PillInputType = { id: number; name: string };

interface PillInputComponentProps {
  title: string;
  existingPills: PillInputType[];
  onChange: Function;
  onRemove: Function;
  isLoading?: boolean | undefined;
}

const PillInputComponent: React.FC<PillInputComponentProps> = ({
  title,
  existingPills,
  onChange,
  onRemove,
  isLoading,
}) => {
  const [inputValue, setInputValue] = useState<PillInputType>({
    id: 0,
    name: "",
  }); // Tracks the current input value
  const [pills, setPills] = useState<PillInputType[]>(existingPills); // Stores the list of pills

  const { t } = useTranslation("common");

  const handleAddPill = (): void => {
    const trimmedValue = inputValue.name;
    if (
      trimmedValue &&
      !pills.filter((s: PillInputType) => s.name === trimmedValue).length
    ) {
      setPills((prevPills) => {
        return [...prevPills, { id: 0, name: trimmedValue }];
      });
      setInputValue({ id: 0, name: "" }); // Clear input field
      onChange({ id: inputValue.id, name: trimmedValue });
    }
  };

  const handleRemovePill = (pillToRemove: PillInputType): void => {
    setPills((prevPills) =>
      prevPills.filter((pill) =>
        pillToRemove.id > 0
          ? pill.id !== pillToRemove.id
          : pill.name !== pillToRemove.name
      )
    );
    onRemove(pillToRemove);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddPill();
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <Label for="validationServer01" check>
        {title}
      </Label>
      <Input
        type="text"
        value={inputValue.name}
        onChange={(e) => setInputValue({ id: 0, name: e.target.value })}
        onKeyPress={handleKeyPress}
        placeholder={t("Type and press enter")}
        disabled={isLoading}
        style={{
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginBottom: "10px",
          width: "100%",
        }}
      />
      <Button
        disabled={isLoading}
        type="button"
        className="btn btn-primary"
        onClick={handleAddPill}
      >
        Add
      </Button>
      <div
        style={{
          marginTop: "15px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {pills.map((pill, index) => (
          <div
            key={index}
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              padding: "5px 10px",
              borderRadius: "20px",
              fontSize: "14px",
              color: "#333",
              border: "1px solid #ccc",
            }}
          >
            {pill.name}
            <span
              onClick={() => handleRemovePill(pill)}
              aria-disabled={isLoading}
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                color: "#ff0000",
                fontWeight: "bold",
              }}
            >
              &times;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PillInputComponent;
