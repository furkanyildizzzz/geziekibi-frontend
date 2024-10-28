"use client";
import { editTag } from "@/app/actions/tag/editTag";
import { getTagById } from "@/app/actions/tag/getTagById";
import ModalComponent from "@/CommonComponent/Modal";
import { Cancel, EditTagHeading, TagName, Edit } from "@/Constant/constant";
import useFormState from "@/hooks/useFormState";
import { TagSuccessResponse } from "@/Types/ApiResponseType";
import DisplayError from "@/utils/DisplayError";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const EditTagModal = ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter();

  const [tag, setTag] = useState<TagSuccessResponse>();

  const {
    isLoading,
    errorMessage,
    errorsValidation,
    isSuccess,
    inputValues,
    setFormValues,
    handleChange,
    handleEditSubmit,
    resetFormState,
  } = useFormState(tag);

  const fetchTagData = async () => {
    const response = await getTagById(Number(id));
    console.log({ response });
    if ("data" in response) {
      console.log({ data: response.data });
      setTag({ ...response.data });
      setFormValues({ ...response.data });
      console.log({ tag });
      console.log({ inputValues });
    }
  };

  useEffect(() => {
    fetchTagData();
    if (isSuccess) {
      resetFormState();
      router.back();
    }
  }, [isSuccess]);

  const formSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    await handleEditSubmit(event, editTag);
  };

  return (
    <ModalComponent title={EditTagHeading + ` "${tag?.name}"`}>
      <Col xs="12">
        <Form className="theme-form" onSubmit={formSubmitHandle}>
          <DisplayError errorMessage={errorMessage} />
          <FormGroup>
            <Input
              name="id"
              className="m-0"
              id="id"
              type="number"
              required
              value={tag?.id}
              hidden
            />
            <DisplayError errorsValidation={errorsValidation} keyProp="id" />{" "}
          </FormGroup>
          <FormGroup>
            <Label for="name" check>
              {TagName} <span className="txt-danger"> *</span>
            </Label>
            <Input
              name="name"
              className="m-0"
              id="name"
              value={inputValues.name}
              type="text"
              onChange={handleChange}
              required
            />
            <DisplayError errorsValidation={errorsValidation} keyProp="name" />{" "}
          </FormGroup>
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
          <Button color="primary" type="submit" disabled={isLoading}>
            {" "}
            {Edit}
          </Button>
        </Form>
      </Col>
    </ModalComponent>
  );
};

export default EditTagModal;
