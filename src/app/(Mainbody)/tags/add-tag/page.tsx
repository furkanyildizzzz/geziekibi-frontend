"use client";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { FormEvent, useEffect, useState } from "react";
import SimpleMdeReact from "react-simplemde-editor";
import {
  Add,
  Cancel,
  TagName,
  CreateNewTagHeading,
  Href,
} from "@/Constant/constant";
import DisplayError from "@/utils/DisplayError";
import { createNewTag } from "@/app/actions/tag/createNewTag";
import useFormState from "@/hooks/useFormState";

interface ICreateNewTagProps {
  reload: () => Promise<void>;
}

const CreateNewTag: React.FC<ICreateNewTagProps> = (
  props: ICreateNewTagProps
) => {
  const mdeEditorText = `Enter your messages...`;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const {
    isLoading,
    errorsValidation,
    isSuccess,
    handleSubmit,
    resetFormState,
  } = useFormState();

  useEffect(() => {
    if (isSuccess) {
      props.reload();
      toggle();
      resetFormState();
    }
  }, [isSuccess]);

  const formSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    await handleSubmit(event, createNewTag);
    console.log({ isSuccess });
    console.log({ errorsValidation });

    if (isSuccess) {
      toggle();
      resetFormState();
    }
  };
  return (
    <Col xs="12">
      <Form className="theme-form" onSubmit={formSubmitHandle}>
        <FormGroup>
          <Label for="name" check>
            {TagName} <span className="txt-danger"> *</span>
          </Label>
          <Input name="name" className="m-0" id="name" type="text" required />
          <DisplayError
            errorsValidation={errorsValidation}
            keyProp="name"
          />{" "}
        </FormGroup>
        <Button color="light" onClick={toggle} disabled={isLoading}>
          {" "}
          {Cancel}
        </Button>
        <Button color="primary" type="submit" disabled={isLoading}>
          {" "}
          {Add}
        </Button>
      </Form>
    </Col>
  );
};

export default CreateNewTag;
