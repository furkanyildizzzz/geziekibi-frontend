import { useCallback, useEffect, useState } from "react";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import Link from "next/link";
import { DragYourImageHere, Href, TourImage } from "@/Constant/constant";
import { Form } from "reactstrap";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import SVG from "@/Components/SVG/Svg";
import AlreadyUploadedDropzone from "@/Components/Dropzone/AlreadyUploadedDropzone";
import { CloudinaryImage, ErrorValidation } from "@/Types/ApiResponseType";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import ShowSuccess from "@/Components/Toast/Success/ShowSuccess";
import {
  uploadMultipleFile,
  uploadSingleFile,
} from "@/app/actions/upload/uploadFile";
import { uploadProfileImage } from "@/app/actions/user/uploadProfileImage";
import DisplayError from "@/utils/DisplayError";
import ShowError from "@/Components/Toast/Error/ShowError";
import { deleteProfileImage } from "@/app/actions/user/deleteProfileImage";
import { LoadingButton } from "@/Components/Button/Loading";

const EditProfilePrimaryImages = ({
  setShowUploadInput,
  userProfileImage,
  handleSuccessUpload,
  handleSuccessRemove,
}: {
  setShowUploadInput: Function;
  userProfileImage: CloudinaryImage | undefined;
  handleSuccessUpload: Function;
  handleSuccessRemove: Function;
}) => {
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [errorsValidation, setErrorsValidation] = useState<ErrorValidation[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");

  const [files, setFiles] = useState<ExtFile[]>([]);
  const [profileImage, setProfileImage] = useState<CloudinaryImage | undefined>(
    userProfileImage
  );

  const { t } = useTranslation("common");

  const updateFiles = (files: ExtFile[]) => {
    setFiles(files);
  };

  const handleUploadFiles = async () => {
    setIsLoading(true); // Set loading to true when form submission starts
    setErrorsValidation([]);
    try {
      const response = await uploadProfileImage(files[0].file!);
      console.log({ response });

      if ("errorType" in response) {
        ShowError(response.errorMessage);
        setErrorsValidation(response.errorsValidation!);
      } else {
        ShowSuccess(response.message);
        handleSuccessUpload(response.data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false); // Set loading to false when form submission ends
    }
    return;
  };

  const removeFile = (id: string | number | undefined) => {
    setFiles((prev) => [...prev.filter((x: ExtFile) => x.id !== id)]);
  };

  const handleExistingFileRemove = async (publicId: string) => {
    console.log({ publicId });
    setProfileImage(undefined);
    await deleteProfileImage(publicId);
    ShowSuccess("User profile image deleted successfully");
    handleSuccessRemove();
  };

  return (
    <div className="product-upload" style={{ color: "white" }}>
      <DisplayError errorsValidation={errorsValidation} />
      {profileImage && (
        <AlreadyUploadedDropzone
          images={[profileImage]}
          onReorder={(orderdFiles) => console.log(orderdFiles)}
          onRemove={handleExistingFileRemove}
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
              <h6 style={{ color: "white" }}>
                {t("DragYourImageHere")}
                <Link className="txt-primary" href={Href}>
                  &nbsp;{t("browser")}
                </Link>
              </h6>
              <span className="note needsclick" style={{ color: "white" }}>
                SVG,PNG,JPG {t("or")} GIF
              </span>
            </div>
          </Form>
        )}
      </Dropzone>
      <div style={{ display: "flex", gap: "3%", justifyContent: "center" }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowUploadInput(false)}
        >
          {t("Cancel")}
        </button>
        {files.length > 0 && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleUploadFiles}
          >
            {isLoading ? <LoadingButton /> : t("Upload")}
          </button>
        )}
      </div>
    </div>
  );
};

export default EditProfilePrimaryImages;
