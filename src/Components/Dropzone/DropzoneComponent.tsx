import SVG from "@/Components/SVG/Svg";
import { Href } from "@/Constant/constant";
import { CloudinaryImage } from "@/Types/ApiResponseType";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form } from "reactstrap";

interface DropzoneCompnenetProps {
  existingFiles: CloudinaryImage[];
  updateFiles: (files: ExtFile[]) => void;
  removeFile: (id: string | number | undefined) => void;
}

export const DropzoneComponent: React.FC<DropzoneCompnenetProps> = ({
  existingFiles,
  updateFiles,
  removeFile,
}) => {
  const { t } = useTranslation("common");
  const [files, setFiles] = useState<ExtFile[]>([]);

  const handleRemove = (id: string | number | undefined) => {
    setFiles(files.filter((x: ExtFile) => x.id !== id));
  };

  return (
    <Dropzone
      onChange={(files) => setFiles(files)}
      value={files}
      maxFiles={1}
      multiple={true}
      header={false}
      footer={false}
      minHeight="80px"
      name="primaryImages"
    >
      {files.map((file: ExtFile) => (
        <FileMosaic
          key={file.id}
          {...file}
          imageUrl={URL.createObjectURL(file.file!)}
          onDelete={handleRemove}
          info={true}
        />
      ))}
      {files.length === 0 && (
        <Form className="dropzone dropzone-light dz-clickable py-5">
          <div className="dz-message needsclick">
            <SVG iconId="file-upload" />
            <h6>
              {t("DragYourImageHere")}
              <Link className="txt-primary" href={Href}>
                &nbsp;{t("browser")}
              </Link>
            </h6>
            <span className="note needsclick">SVG,PNG,JPG {t("or")} GIF</span>
          </div>
        </Form>
      )}
    </Dropzone>
  );
};
