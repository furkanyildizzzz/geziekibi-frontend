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
import ShowError from "@/Components/Toast/Error/ShowError";

const TourGalleryImages = () => {
  const { formValue, isLoading } = useAppSelector((state) => state.addProduct);
  const [files, setFiles] = useState<ExtFile[]>([]);
  const [existingFiles, setExistingFiles] = useState<CloudinaryImage[]>([]);
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");
  const { t: tForm } = useTranslation("form");

  const updateFiles = (files: ExtFile[]) => {
    if (files.length > 5) {
      ShowError(tForm, "Maximum 5 adet yükleyebilirsiniz");
      return;
    }
    setFiles(files);
    dispatch(setFormValue({ name: "galleryImages", value: files }));
  };

  const removeFile = (id: string | number | undefined) => {
    dispatch(setFormValue({ name: "galleryImages", value: [] }));
    setFiles(files.filter((x: ExtFile) => x.id !== id));
  };

  const setExistingImages = useCallback(async () => {
    setExistingFiles(formValue.uploadedGalleryImages);
  }, [formValue]);

  useEffect(() => {
    if (formValue.id && !existingFiles.length) setExistingImages();
  }, [setExistingImages]);

  return (
    <div className="product-upload">
      <p>
        {t("TourGallery")}
        <span className="txt-danger"> *</span>{" "}
      </p>
      {existingFiles.length > 0 && (
        <AlreadyUploadedDropzone
          images={existingFiles}
          onReorder={(orderdFiles) => console.log(orderdFiles)}
          onRemove={(publicId: string) => {
            console.log({ publicId });
            console.log({ existingFiles });
            dispatch(
              setFormValue({
                name: "uploadedGalleryImages",
                value: existingFiles.filter((s) => s.publicId !== publicId),
              })
            );
            setExistingFiles([]);
          }}
        />
      )}
      <Dropzone
        onChange={(files: ExtFile[]) => updateFiles(files)}
        disabled={isLoading}
        value={files}
        maxFiles={5}
        header={false}
        footer={false}
        minHeight="80px"
        name="galleryImages"
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

export default TourGalleryImages;
