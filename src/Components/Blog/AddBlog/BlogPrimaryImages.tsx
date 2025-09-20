import { useCallback, useEffect, useState } from "react";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import Link from "next/link";
import { DragYourImageHere, Href, TourImage } from "@/Constant/constant";
import { Form } from "reactstrap";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import SVG from "@/Components/SVG/Svg";
import AlreadyUploadedDropzone from "@/Components/Dropzone/AlreadyUploadedDropzone";
import { CloudinaryImage } from "@/Types/ApiResponseType";
import { useTranslation } from "react-i18next";

interface BlogPrimaryImagesProps {
  onUploadFiles: (files: ExtFile[]) => void;
  onRemoveFile: (id: string | number | undefined) => void;
  onExitingFileRemove: (publicId: string) => void;
  uploadedPrmaryImages?: CloudinaryImage[] | [];
}

const BlogPrimaryImages: React.FC<BlogPrimaryImagesProps> = ({
  onUploadFiles,
  onRemoveFile,
  onExitingFileRemove,
  uploadedPrmaryImages = [],
}) => {
  const [files, setFiles] = useState<ExtFile[]>([]);
  const [existingFiles, setExistingFiles] =
    useState<CloudinaryImage[]>(uploadedPrmaryImages);
  const { t } = useTranslation("common");

  const updateFiles = (files: ExtFile[]) => {
    setFiles(files);
    onUploadFiles(files);
  };

  const removeFile = (id: string | number | undefined) => {
    onRemoveFile(id);
    setFiles(files.filter((x: ExtFile) => x.id !== id));
  };

  const handleExistingFileRemove = (publicId: string) => {
    console.log({ publicId });
    onExitingFileRemove(publicId);
    setExistingFiles([]);
  };

  return (
    <div className="product-upload">
      {existingFiles.length > 0 && (
        <AlreadyUploadedDropzone
          images={existingFiles}
          onReorder={(orderdFiles) => console.log(orderdFiles)}
          onRemove={handleExistingFileRemove}
        />
      )}
      <Dropzone
        onChange={(files: ExtFile[]) => updateFiles(files)}
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
            onDelete={removeFile}
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
    </div>
  );
};

export default BlogPrimaryImages;
