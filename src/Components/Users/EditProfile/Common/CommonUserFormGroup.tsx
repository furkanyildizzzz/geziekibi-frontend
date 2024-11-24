import { EditUserSchema } from "@/app/lib/definitions";
import { UserSuccessResponse } from "@/Types/ApiResponseType";
import { CommonUserFormGroupType } from "@/Types/UserType";
import DisplayError from "@/utils/DisplayError";
import { Controller, useFormContext } from "react-hook-form";
import { FormGroup, Input, Label } from "reactstrap";

const CommonUserFormGroup: React.FC<CommonUserFormGroupType> = ({
  name,
  type,
  title,
  placeholder,
  defaultValue,
  row,
}) => {
  const {
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<any>();
  return (
    <FormGroup>
      <Label className="form-label">{title}</Label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        render={({ field }) => (
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            rows={row}
            invalid={!!errors[name]} // If there's an error, mark the input as invalid
          />
        )}
      />
      <DisplayError errors={errors} keyProp={name} />{" "}
    </FormGroup>
  );
};

export default CommonUserFormGroup;
