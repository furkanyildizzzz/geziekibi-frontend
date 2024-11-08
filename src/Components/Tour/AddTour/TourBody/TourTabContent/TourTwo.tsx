import TourGallery from "./TourGallery";
import { useEffect, useState } from "react";
import {
  Dropzone,
  ExtFile,
  FileMosaic,
  ImagePreview,
} from "@dropzone-ui/react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import Link from "next/link";
import { DragYourImageHere, Href, TourImage } from "@/Constant/constant";
import { Form } from "reactstrap";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import SVG from "@/CommonComponent/SVG/Svg";
import AlreadyUploadedDropzone from "@/Components/Dropzone/AlreadyUploadedDropzone";

const TourTwo = () => {
  const { formValue } = useAppSelector((state) => state.addProduct);
  const [files, setFiles] = useState<ExtFile[]>([]);
  const dispatch = useAppDispatch();

  const updateFiles = (incomingFiles: ExtFile[]) => {
    setFiles(incomingFiles);
    dispatch(setFormValue({ name: "image", value: incomingFiles[0].file }));
  };

  const removeFile = (id: string | number | undefined) => {
    dispatch(setFormValue({ name: "image", value: [] }));
    setFiles(files.filter((x: ExtFile) => x.id !== id));
  };

  return (
    <div className="sidebar-body">
      <div className="product-upload">
        <p>
          {TourImage}
          <span className="txt-danger"> *</span>{" "}
        </p>
        {formValue.image.length > 0 && (
          <AlreadyUploadedDropzone
            images={[formValue.image]}
            onRemove={() => {
              dispatch(setFormValue({ name: "image", value: [] }));
            }}
          />
        )}
        <Dropzone
          onChange={(files) => updateFiles(files)}
          value={files}
          maxFiles={1}
          header={false}
          footer={false}
          minHeight="80px"
          name="image"
        >
          {/* {files.map((file: ExtFile) => (
            <FileMosaic
              key={file.id}
              {...file}
              imageUrl={URL.createObjectURL(file.file!)}
              onDelete={removeFile}
              info={true}
            />
          ))} */}
          {files.length === 0 && (
            <Form className="dropzone dropzone-light dz-clickable py-5">
              <div className="dz-message needsclick">
                <SVG iconId="file-upload" />
                <h6>
                  {DragYourImageHere}
                  <Link className="txt-primary" href={Href}>
                    &nbsp;browser
                  </Link>
                </h6>
                <span className="note needsclick">SVG,PNG,JPG or GIF</span>
              </div>
            </Form>
          )}
        </Dropzone>
      </div>
      <TourGallery />
    </div>
  );
};

export default TourTwo;
