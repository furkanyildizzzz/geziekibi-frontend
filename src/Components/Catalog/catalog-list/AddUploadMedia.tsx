import React, { useState } from "react";
import { Button, Form, Input } from "reactstrap";
import { PlusSquare, Upload } from "react-feather";
import { AddUploadMediaProps } from "@/Types/FileManagerType";
import AddCatalogDropzone from "./AddCatalogDropzoneModal";

const AddUploadMedia: React.FC<AddUploadMediaProps> = ({ onFileUpload }) => {
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);

  return (
    <div className="flex-grow-1 text-end">
      <Form className="d-inline-flex">
        <Button
          color="primary"
          className="plus-square"
          onClick={() => setOpenUploadModal(true)}
        >
          <PlusSquare /> {"Add New"}
        </Button>
      </Form>

      {openUploadModal && (
        <AddCatalogDropzone
          value={openUploadModal}
          setOpenModal={setOpenUploadModal}
          onFileUpload={onFileUpload}
        />
      )}
    </div>
  );
};
export default AddUploadMedia;
