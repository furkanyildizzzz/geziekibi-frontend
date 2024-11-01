import { useState } from "react";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import { useAppDispatch } from "@/Redux/Hooks";
import { Form } from "reactstrap";
import {
  AddTourGalleryImages,
  DragFilesHere,
  TourGalery,
} from "@/Constant/constant";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import SVG from "@/CommonComponent/SVG/Svg";

const TourGallery = () => {
  const [files, setFiles] = useState<ExtFile[]>([]);
  const dispatch = useAppDispatch();

  const updateFiles = (incomingFiles: ExtFile[]) => {
    setFiles(incomingFiles);
    console.log({ name: "gallery", value: incomingFiles[0].file?.name });
    dispatch(
      setFormValue({ name: "gallery", value: incomingFiles[0].file?.name })
    );
  };

  const removeFile = (id: string | number | undefined) => {
    setFiles(files.filter((x: ExtFile) => x.id !== id));
  };

  return (
    <div className="product-upload">
      <p>
        {TourGalery}
        <span className="txt-danger"> *</span>
      </p>
      <Dropzone
        onChange={(files) => updateFiles(files)}
        value={files}
        maxFiles={1}
        header={false}
        footer={false}
        minHeight="80px"
        name="gallery"
      >
        {files.map((file: ExtFile) => (
          <FileMosaic
            key={file.id}
            {...file}
            onDelete={removeFile}
            info={true}
          />
        ))}
        {files.length === 0 && (
          <Form className="dropzone dropzone-light dz-clickable py-5">
            <div className="dz-message needsclick">
              <SVG iconId="file-upload1" />
              <h6>{DragFilesHere}</h6>
              <span className="note needsclick">{AddTourGalleryImages}</span>
            </div>
          </Form>
        )}
      </Dropzone>
    </div>
  );
};

export default TourGallery;
