import React, { useEffect, useState } from "react";
import "./ThreeChoiceSwitch.css"; // Import the CSS htmlFor styles
import styled from "styled-components";
import { Inherit, No, Yes } from "@/Constant/constant";
import { TourServiceTypeEnum } from "@/app/lib/enums";
import { useAppSelector } from "@/Redux/Hooks";

// Styled Components
const SwitchContainer = styled.div`
  position: relative;
  height: 32px;
  width: 150px;
  margin: 20px auto;
  background: #d7d7d7;
  border-radius: 32px;
`;

const SwitchLabel = styled.label<{ isActive: boolean }>`
  font-weight: bold;
  position: relative;
  z-index: 2;
  float: left;
  width: 50px;
  line-height: 32px;
  font-size: 12px;
  color: ${({ isActive }) => (isActive ? "#fff" : "#676a6c")};
  text-align: center;
  cursor: pointer;
  transition: color 0.15s ease-out;
`;

const SwitchInput = styled.input`
  display: none;
`;

const SwitchSelector = styled.span<{ position: number }>`
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 0px;
  display: block;
  width: 50px;
  height: 32px;
  border-radius: 32px;
  background-color: ${({ position }) =>
    position === 0 ? "#ed5565" : position === 1 ? "#f8ac59" : "#1ab394"};
  transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  transform: translateX(${({ position }) => position * 100}%);
`;

const ThreeChoiceSwitch: React.FC<{
  id: number;
  name: string;
  onSelectChange: Function | null;
  type: TourServiceTypeEnum;
}> = ({ id, name, onSelectChange, type }) => {
  const [selected, setSelected] = useState<TourServiceTypeEnum>(type); // Default to 'Inherit'
  const { isLoading } = useAppSelector((state) => state.addProduct);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { serviceId, serviceName } = event.target.dataset;
    setSelected(event.target.value as TourServiceTypeEnum);
    if (onSelectChange) {
      onSelectChange(
        event.target.value as TourServiceTypeEnum,
        serviceId,
        serviceName
      );
    }
  };

  useEffect(() => {}, [selected]);

  return (
    <SwitchContainer>
      <SwitchInput
        id={`switch-n-${id}`}
        name="triple"
        type="radio"
        value="excluded"
        checked={selected === TourServiceTypeEnum.EXCLUDED}
        onChange={handleChange}
        data-service-id={id}
        data-service-name={name}
        disabled={isLoading}
      />
      <SwitchLabel
        htmlFor={`switch-n-${id}`}
        isActive={selected === TourServiceTypeEnum.EXCLUDED}
      >
        {No}
      </SwitchLabel>

      <SwitchInput
        id={`switch-i-${id}`}
        name="triple"
        type="radio"
        value="inherit"
        checked={selected === TourServiceTypeEnum.INHERIT}
        onChange={handleChange}
        data-service-id={id}
        data-service-name={name}
        disabled={isLoading}
      />
      <SwitchLabel
        htmlFor={`switch-i-${id}`}
        isActive={selected === TourServiceTypeEnum.INHERIT}
      >
        {Inherit}
      </SwitchLabel>

      <SwitchInput
        id={`switch-y-${id}`}
        name="triple"
        type="radio"
        value="included"
        checked={selected === TourServiceTypeEnum.INCLUDED}
        onChange={handleChange}
        data-service-id={id}
        data-service-name={name}
        disabled={isLoading}
      />
      <SwitchLabel
        htmlFor={`switch-y-${id}`}
        isActive={selected === TourServiceTypeEnum.INCLUDED}
      >
        {Yes}
      </SwitchLabel>

      <SwitchSelector
        position={
          selected === TourServiceTypeEnum.EXCLUDED
            ? 0
            : selected === TourServiceTypeEnum.INHERIT
            ? 1
            : 2
        }
      />
    </SwitchContainer>
  );
};

export default ThreeChoiceSwitch;
