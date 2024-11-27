import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import TourDailyDescription from "./TourDailyDescription";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import SelectTourDailyPath from "./SelectTourDailyPath";
import DailyVisitingPlaces from "./DailyVisitingPlaces";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateTourCategoryFormSchema,
  DailyFormFormSchema,
} from "@/app/lib/definitions";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { FormData } from "./TourSix";

interface TourDailyFormProps {
  formId: number;
  formData: FormData;
  onFieldChange: (index: number, fieldName: keyof FormData, value: any) => void;
}

export const TourDailyForm: React.FC<TourDailyFormProps> = ({
  formId,
  formData,
  onFieldChange,
}) => {
  const { t } = useTranslation("common");

  const methods = useForm({
    resolver: zodResolver(DailyFormFormSchema),
    defaultValues: formData || {},
  });

  useEffect(() => {
    console.log({ formData });
    methods.reset({ ...formData });
  }, [formData]);

  return (
    <FormProvider {...methods}>
      <Form>
        <Row className="g-2">
          <Col xs="12">
            <SelectTourDailyPath
              formId={formId}
              onFieldChange={onFieldChange}
              existingValues={formData.dailyPaths}
            />
          </Col>

          <Col xs="2"></Col>

          <FormGroup>
            <Col xs="12">
              <DailyVisitingPlaces
                formId={formId}
                onFieldChange={onFieldChange}
                existingValues={formData.dailyVisitingPlaces}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col xs="12">
              <Label className="m-0" check>
                {t("Breakfeast")}
              </Label>
            </Col>
            <Col xs="12">
              <Controller
                name={"breakfeast"}
                control={methods.control}
                defaultValue={formData?.breakfeast || ""} // Gelen formData'yı default olarak kullan
                render={({ field }) => (
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e); // React Hook Form'un kontrolünü sağlamaya devam eder
                      onFieldChange(formId, "breakfeast", e.target.value); // Redux state'ini günceller
                    }}
                    type={"text"}
                    invalid={!!methods.formState.errors["breakfeast"]}
                  />
                )}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col xs="12">
              <Label className="m-0" check>
                {t("Lunch")}
              </Label>
            </Col>
            <Col xs="12">
              <Controller
                name={"lunch"}
                control={methods.control}
                defaultValue={formData?.lunch || ""} // Gelen formData'yı default olarak kullan
                render={({ field }) => (
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e); // React Hook Form'un kontrolünü sağlamaya devam eder
                      onFieldChange(formId, "lunch", e.target.value); // Redux state'ini günceller
                    }}
                    type={"text"}
                    invalid={!!methods.formState.errors["lunch"]}
                  />
                )}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col xs="12">
              <Label className="m-0" check>
                {t("Dinner")}
              </Label>
            </Col>
            <Col xs="12">
              <Controller
                name={"dinner"}
                control={methods.control}
                defaultValue={formData?.dinner || ""} // Gelen formData'yı default olarak kullan
                render={({ field }) => (
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e); // React Hook Form'un kontrolünü sağlamaya devam eder
                      onFieldChange(formId, "dinner", e.target.value); // Redux state'ini günceller
                    }}
                    type={"text"}
                    invalid={!!methods.formState.errors["dinner"]}
                  />
                )}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <TourDailyDescription
              formId={formId}
              onFieldChange={onFieldChange}
              initialValue={methods.getValues("description")}
            />
          </FormGroup>
        </Row>
      </Form>
    </FormProvider>
  );
};
