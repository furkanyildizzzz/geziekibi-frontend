import { CardBody, Col, FormGroup, Input, Label, Row } from "reactstrap";
import {
  AboutMe,
  Address,
  City,
  Company,
  Country,
  Email,
  EmailAddress,
  FirstName,
  LastName,
  PostalCode,
  SecondEmailAddress,
  Username,
  ZipCode,
} from "@/Constant/constant";
import CommonUserFormGroup from "../Common/CommonUserFormGroup";
import { useFormContext, UseFormRegister } from "react-hook-form";
import { UserSuccessResponse } from "@/Types/ApiResponseType";
import { EditUserSchema } from "@/app/lib/definitions";
import { useTranslation } from "react-i18next";

export const EditProfileFormBody = () => {
  const { t } = useTranslation("common");
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<EditUserSchema>();
  return (
    <CardBody>
      <Row>
        <Col sm="6" md="6">
          <CommonUserFormGroup
            type="text"
            title={"FirstName"}
            placeholder={FirstName}
            name="firstName"
          />
        </Col>
        <Col sm="6" md="6">
          <CommonUserFormGroup
            type="text"
            title={"LastName"}
            placeholder={LastName}
            name="lastName"
          />
        </Col>
        <Col sm="6" md="6">
          <CommonUserFormGroup
            type="email"
            title={"SecondEmailAddress"}
            placeholder={Email}
            name={`secondEmail`}
          />
        </Col>
        <Col sm="6" md="6">
          <CommonUserFormGroup
            type="text"
            title={"Website"}
            placeholder={"geziekibi.com.tr"}
            name="website"
          />
        </Col>
        <Col md="12">
          <CommonUserFormGroup
            type="text"
            title={"Address"}
            placeholder={Address}
            name="address"
          />
        </Col>
        <Col sm="6" md="4">
          <CommonUserFormGroup
            type="text"
            title={"City"}
            placeholder={City}
            name="city"
          />
        </Col>
        <Col sm="6" md="3">
          <CommonUserFormGroup
            type="text"
            title={"PostalCode"}
            placeholder={ZipCode}
            name="zipCode"
          />
        </Col>
        <Col md="5">
          <FormGroup>
            <Label check>{t("Country")}</Label>
            <Input
              type="select"
              className="rounded-2 btn-square"
              value={getValues("country")}
              onChange={(e) => setValue("country", e.target.value)}
            >
              <option value="Türkiye">Türkiye</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md="12">
          <CommonUserFormGroup
            type="textarea"
            title={"AboutMe"}
            placeholder="Enter About your description"
            row={4}
            name="bio"
          />
        </Col>
      </Row>
    </CardBody>
  );
};
