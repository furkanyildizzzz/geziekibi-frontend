import React, { useEffect, useState } from "react";
import "./ThreeChoiceSwitch.css"; // Import the CSS htmlFor styles
import styled from "styled-components";
import { Inherit, No, Yes } from "@/Constant/constant";

const ThreeChoiceSwitch: React.FC<{ key: any; id: number }> = ({ key, id }) => {
  const [selected, setSelected] = useState<"Y" | "I" | "N">("I"); // Default to 'Inherit'

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value as "Y" | "I" | "N");
  };

  useEffect(() => {}, [selected]);

  return (
    <div className="switch" key={id}>
      <input
        id={"switch-y-" + id}
        name="tripple"
        type="radio"
        value="Y"
        className="switch-input"
        {...(selected === "Y" ? { checked: true } : {})}
        onChange={handleChange} // Update state on change
      />
      <label htmlFor={"switch-y-" + id} className="switch-label switch-label-y">
        Yes
      </label>

      <input
        id={"switch-i-" + id}
        name="tripple"
        type="radio"
        value="I"
        className="switch-input"
        {...(selected === "I" ? { checked: true } : {})}
        onChange={handleChange} // Update state on change
      />
      <label htmlFor={"switch-i-" + id} className="switch-label switch-label-i">
        Inherit
      </label>

      <input
        id={"switch-n-" + id}
        name="tripple"
        type="radio"
        value="N"
        className="switch-input"
        {...(selected === "N" ? { checked: true } : {})}
        onChange={handleChange} // Update state on change
      />
      <label htmlFor={"switch-n-" + id} className="switch-label switch-label-n">
        No
      </label>
      <span className="switch-selector"></span>
    </div>
  );
};

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

const ThreeChoiceSwitch3: React.FC<{
  id: number;
  name: string;
  onSelectChange: Function | null;
}> = ({ id, name, onSelectChange }) => {
  const [selected, setSelected] = useState<"N" | "I" | "Y">("I"); // Default to 'Inherit'

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { serviceId, serviceName } = event.target.dataset;
    console.log({ serviceId, serviceName });
    setSelected(event.target.value as "N" | "I" | "Y");
    if (onSelectChange) {
      onSelectChange(event.target.value, serviceId, serviceName);
    }
  };

  useEffect(() => {}, [selected]);

  return (
    <SwitchContainer>
      <SwitchInput
        id={`switch-n-${id}`}
        name="triple"
        type="radio"
        value="N"
        checked={selected === "N"}
        onChange={handleChange}
        data-service-id={id}
        data-service-name={name}
      />
      <SwitchLabel htmlFor={`switch-n-${id}`} isActive={selected === "N"}>
        {No}
      </SwitchLabel>

      <SwitchInput
        id={`switch-i-${id}`}
        name="triple"
        type="radio"
        value="I"
        checked={selected === "I"}
        onChange={handleChange}
        data-service-id={id}
        data-service-name={name}
      />
      <SwitchLabel htmlFor={`switch-i-${id}`} isActive={selected === "I"}>
        {Inherit}
      </SwitchLabel>

      <SwitchInput
        id={`switch-y-${id}`}
        name="triple"
        type="radio"
        value="Y"
        checked={selected === "Y"}
        onChange={handleChange}
        data-service-id={id}
        data-service-name={name}
      />
      <SwitchLabel htmlFor={`switch-y-${id}`} isActive={selected === "Y"}>
        {Yes}
      </SwitchLabel>

      <SwitchSelector
        position={selected === "N" ? 0 : selected === "I" ? 1 : 2}
      />
    </SwitchContainer>
  );
};

export default ThreeChoiceSwitch3;
