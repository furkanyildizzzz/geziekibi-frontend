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
import { useRouter } from "next/navigation";

interface ICreateNewTagProps {
  reload: () => Promise<void>;
}

const CreateNewTag: React.FC<ICreateNewTagProps> = (
  props: ICreateNewTagProps
) => {
  const mdeEditorText = `Enter your messages...`;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

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
      props.reload();
      toggle();
      resetFormState();
    }
  }, [isSuccess]);

  const formSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    await handleSubmit(event, createNewTag);

    if (isSuccess) {
      toggle();
      resetFormState();
    }
  };
  return (
    <Col xs="12">
      <div className="tag-buton">
        <Button
          color="transparent"
          tag="a"
          className="button-primary bg-light-primary font-primary"
          href={Href}
          // onClick={toggle}
          onClick={() => router.push("/tags/add-tag")}
        >
          <i className="me-2 fa fa-plus"> </i>
          {CreateNewTagHeading}
        </Button>
      </div>

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <Form className="theme-form" onSubmit={formSubmitHandle}>
          <div className="modal-header">
            <h1 className="modal-title fs-5">{CreateNewTagHeading}</h1>
            <Button close onClick={toggle} />
          </div>
          <ModalBody className="custom-input">
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
          </ModalBody>
          <ModalFooter>
            <Button color="light" onClick={toggle} disabled={isLoading}>
              {" "}
              {Cancel}
            </Button>
            <Button color="primary" type="submit" disabled={isLoading}>
              {" "}
              {Add}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Col>
  );
};

export default CreateNewTag;
