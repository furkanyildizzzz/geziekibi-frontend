import TourGallery from "./TourGallery";
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
import { usePathname } from "next/navigation";

const TourPrimaryImages = () => {
  const { formValue, isLoading } = useAppSelector((state) => state.addProduct);
  const [files, setFiles] = useState<ExtFile[]>([]);
  const [existingFiles, setExistingFiles] = useState<CloudinaryImage[]>([]);
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");
  const updateFiles = (files: ExtFile[]) => {
    setFiles(files);
    dispatch(setFormValue({ name: "primaryImages", value: files }));
  };

  const removeFile = (id: string | number | undefined) => {
    dispatch(setFormValue({ name: "primaryImages", value: [] }));
    setFiles(files.filter((x: ExtFile) => x.id !== id));
  };

  const setExistingImages = useCallback(async () => {
    setExistingFiles(formValue.uploadedPrimaryImages);
  }, [formValue]);

  useEffect(() => {
    if (formValue.id > 0 && existingFiles.length === 0) setExistingImages();
  }, [setExistingImages]);

  return (
    <div className="product-upload">
      <p>
        {t("TourImage")}
        <span className="txt-danger"> *</span>{" "}
      </p>
      {existingFiles.length > 0 && (
        <AlreadyUploadedDropzone
          images={existingFiles}
          onReorder={(orderdFiles) => console.log(orderdFiles)}
          onRemove={(publicId: string) => {
            console.log({ publicId });
            dispatch(
              setFormValue({
                name: "uploadedPrimaryImages",
                value: existingFiles.filter((s) => s.publicId !== publicId),
              })
            );
            setExistingFiles([]);
          }}
        />
      )}
      <Dropzone
        onChange={(files) => updateFiles(files)}
        value={files}
        maxFiles={1}
        multiple={true}
        header={false}
        footer={false}
        disabled={isLoading}
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

export default TourPrimaryImages;
