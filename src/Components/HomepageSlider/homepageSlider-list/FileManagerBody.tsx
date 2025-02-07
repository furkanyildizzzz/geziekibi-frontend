import { FileManagerBodyProps } from "@/Types/FileManagerType";
import React from "react";
import { CardBody } from "reactstrap";

const FileManagerBody: React.FC<FileManagerBodyProps> = ({ fileList }) => {
  return (
    <CardBody className="file-manager">
      <ul className="grid-container">{fileList}</ul>
    </CardBody>
  );
};
export default FileManagerBody;
