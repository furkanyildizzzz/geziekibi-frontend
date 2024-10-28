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
import { useEffect } from "react";
import { Cancel, TagName, EditTagHeading, Edit } from "@/Constant/constant";
import DisplayError from "@/utils/DisplayError";
import useFormState from "@/hooks/useFormState";
import { TagSuccessResponse } from "@/Types/ApiResponseType";

interface EditTagModalProps {
  isOpen: boolean;
  tag: TagSuccessResponse | null;
  onClose: () => void;
  onSave: (id: number, data: FormData) => Promise<void>;
}

const EditTagModal: React.FC<EditTagModalProps> = ({
  isOpen,
  tag,
  onClose,
  onSave,
}) => {
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
  } = useFormState();

  useEffect(() => {
    console.log({ tag });
    setFormValues(tag || {});
  }, [isOpen, tag]);

  const formSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    await handleEditSubmit(event, onSave);
    console.log({ isSuccess });
    console.log({ errorsValidation });
    console.log({ errorMessage });

    if (isSuccess) {
      resetFormState();
      onClose();
    }
  };
  return (
    <Col xs="12">
      <Modal isOpen={isOpen} size="lg">
        <Form className="theme-form" onSubmit={formSubmitHandle}>
          <div className="modal-header">
            <h1 className="modal-title fs-5">
              {EditTagHeading} {`"${tag?.name}"`}
            </h1>
            <Button close onClick={onClose} />
          </div>
          <DisplayError errorMessage={errorMessage} />
          <ModalBody className="custom-input">
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
              <DisplayError
                errorsValidation={errorsValidation}
                keyProp="name"
              />{" "}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="light" onClick={onClose} disabled={isLoading}>
              {" "}
              {Cancel}
            </Button>
            <Button color="primary" type="submit" disabled={isLoading}>
              {" "}
              {Edit}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Col>
  );
};

export default EditTagModal;
