import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Input, Label } from "reactstrap";

export type PillInputType = { name: string };

interface PillInputComponentProps {
  title: string;
  existingPills: PillInputType[];
  onChange: Function;
  onRemove: Function;
}

const PillInputComponent: React.FC<PillInputComponentProps> = ({
  title,
  existingPills,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState<PillInputType>({ name: "" }); // Tracks the current input value
  const [pills, setPills] = useState<PillInputType[]>(existingPills); // Stores the list of pills

  const { t } = useTranslation("common");

  const handleAddPill = (): void => {
    const trimmedValue = inputValue.name;
    if (
      trimmedValue &&
      !pills.includes((s: PillInputType) => s.name === trimmedValue)
    ) {
      setPills((prevPills) => {
        console.log({ prevPills });
        return [...prevPills, { name: trimmedValue }];
      });
      setInputValue({ name: "" }); // Clear input field
    }
    onChange({ name: trimmedValue });
  };

  const handleRemovePill = (pillToRemove: string): void => {
    setPills((prevPills) =>
      prevPills.filter((pill) => pill.name !== pillToRemove)
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
        onChange={(e) => setInputValue({ name: e.target.value })}
        onKeyPress={handleKeyPress}
        placeholder={t("Type and press enter")}
        style={{
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginBottom: "10px",
          width: "100%",
        }}
      />
      <Button type="button" className="btn btn-primary" onClick={handleAddPill}>
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
              onClick={() => handleRemovePill(pill.name)}
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
