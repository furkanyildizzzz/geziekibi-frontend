"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
// import { useCallback } from "react";
import SimpleMdeReact from "react-simplemde-editor";
import { Col } from "reactstrap";
import RichTextEditor from "@/Components/Editor/RichTextEditor";
import { useCallback } from "react";

type ImageUploadType = {
  (
    image: File,
    onSuccess: (url: string) => void,
    onError: (errorMessage: string) => void
  ): void;
};

const imageUpload: ImageUploadType = async (image, onSuccess, onError) => {
  try {
    const data = new FormData();
    data.append("file", image);
    // replace 'giftea' with your upload preset name, don't use mine lol
    data.append("upload_preset", "giftea");
    // in the cloudinary end point, replace 'gifteacloud' with your cloudinary name

    onSuccess("secure_url");
  } catch (error) {
    console.error(error);
  }
};

const FormEditors = () => {
  const mdeEditorText = `Enter your description...`;
  const { formValue } = useAppSelector((state) => state.addProduct);
  const dispatch = useAppDispatch();

  const handleChange = useCallback((value: string) => {
    console.log({ value });
    dispatch(setFormValue({ name: "body", value: value }));
  }, []);
  return (
    <Col xs="12">
      <div id="editor2">
        <RichTextEditor onChange={handleChange} />

        {/* <SimpleMdeReact
          id="body"
          placeholder={mdeEditorText}
          onChange={(value) => handleChange(value)}
          options={{
            // @ts-ignore comment
            showIcons: ["upload-image"],
            hideIcons: ["bold", "image"],
            autofocus: false,
            spellChecker: false,
            uploadImage: true,
            imageUploadFunction: imageUpload,
          }}
        /> */}
      </div>
      <p className="mt-1 f-light detail-note">
        {"Improve product visibility by adding a compelling description."}
      </p>
    </Col>
  );
};

export default FormEditors;
