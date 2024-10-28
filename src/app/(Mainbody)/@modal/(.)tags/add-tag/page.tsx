"use client";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useEffect } from "react";
import { Add, Cancel, TagName, CreateNewTagHeading } from "@/Constant/constant";
import DisplayError from "@/utils/DisplayError";
import { createNewTag } from "@/app/actions/tag/createNewTag";
import useFormState from "@/hooks/useFormState";
import { useRouter } from "next/navigation";
import ModalComponent from "@/CommonComponent/Modal";

export const CreateNewTagModal = () => {
  const router = useRouter();

  const {
    isLoading,
    errorsValidation,
    isSuccess,
    handleSubmit,
    resetFormState,
  } = useFormState();

  useEffect(() => {
    if (isSuccess) {
      // props.reload();
      resetFormState();
      router.back();
    }
  }, [isSuccess]);

  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    await handleSubmit(event, createNewTag);
  };

  return (
    <ModalComponent title={CreateNewTagHeading}>
      <div className="page-body">
        <Col xs="12">
          <Form className="theme-form" onSubmit={formSubmitHandler}>
            <Row>
              <FormGroup>
                <Label for="name" check>
                  {TagName} <span className="txt-danger"> *</span>
                </Label>
                <Input
                  name="name"
                  className="m-0"
                  id="name"
                  type="text"
                  required
                />
                <DisplayError
                  errorsValidation={errorsValidation}
                  keyProp="name"
                />{" "}
              </FormGroup>
            </Row>
            <Row style={{ justifyContent: "flex-end" }}>
              <Col xs="3">
                <Button
                  color="light"
                  onClick={() => {
                    router.back();
                  }}
                  disabled={isLoading}
                >
                  {" "}
                  {Cancel}
                </Button>
              </Col>
              <Col xs="3">
                <Button color="primary" type="submit" disabled={isLoading}>
                  {" "}
                  {Add}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </div>
    </ModalComponent>
  );
};

export default CreateNewTagModal;
