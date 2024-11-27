import React, { useCallback, useEffect, useRef, useState } from "react";
import "../../../public/assets/css/rte_theme_default.css";
import { useAppSelector } from "@/Redux/Hooks";
import {
  uploadSingleBase64Image,
  uploadSingleFile,
} from "@/app/actions/upload/uploadFile";
// Extend window interface to recognize `RichTextEditor`
declare global {
  interface Window {
    RichTextEditor: any;
  }
}

const RichTextEditor2: React.FC<{
  initialValue: string;
  uploadFolderPath: string;
  onChange: Function;
}> = ({ initialValue, uploadFolderPath, onChange }) => {
  const refDiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!refDiv.current) return;

    // Simulate the RichTextEditor instantiation with config
    const config = {
      file_upload_handler: (
        file: any,
        callback: any,
        optionalIndex: any,
        optionalFiles: any
      ) => {},
    };

    function getCookie(name: string) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()!.split(";").shift();
    }

    config.file_upload_handler = async function fileUploadHandler(
      file: File,
      callback: (response: string | null, error?: string) => void,
      optionalIndex?: number,
      optionalFiles?: File[]
    ): Promise<void> {
      const uploadHandlerPath = `http://localhost:4000/v1${uploadFolderPath}`;

      console.log("upload", file, "to", uploadHandlerPath);

      // Create the dialog for progress
      const dialogOuter = document.createElement("div");
      dialogOuter.style.cssText =
        "display:flex;align-items:center;justify-content:center;z-index:999999;position:fixed;left:0;top:0;width:100%;height:100%;background-color:rgba(128,128,128,0.5)";

      const dialogInner = document.createElement("div");
      dialogInner.style.cssText =
        "background-color:white;border:solid 1px gray;border-radius:15px;padding:15px;min-width:200px;box-shadow:2px 2px 6px #7777";
      dialogOuter.appendChild(dialogInner);

      const line1 = document.createElement("div");
      line1.style.cssText = "text-align:center;font-size:1.2em;margin:0.5em;";
      line1.innerText = "Uploading...";
      dialogInner.appendChild(line1);

      const line2 = document.createElement("div");
      line2.style.cssText = "text-align:center;font-size:1.0em;margin:0.5em;";
      line2.innerText = "0%";
      dialogInner.appendChild(line2);

      const progressBar = document.createElement("div");
      progressBar.style.cssText = "border:solid 1px gray;margin:0.5em;";
      const progressBg = document.createElement("div");
      progressBg.style.cssText = "height:12px;";
      progressBar.appendChild(progressBg);
      dialogInner.appendChild(progressBar);

      const cancelButton = document.createElement("button");
      cancelButton.className = "btn btn-primary";
      cancelButton.innerText = "Cancel";
      let uploadCancelled = false;

      cancelButton.onclick = () => {
        uploadCancelled = true;
        xhr.abort();
        document.body.removeChild(dialogOuter);
      };
      dialogInner.appendChild(cancelButton);

      document.body.appendChild(dialogOuter);

      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        uploadHandlerPath + "?name=" + encodeURIComponent(file.name),
        true
      );

      // Set the Authorization header
      const token = getCookie("token");
      if (token) {
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      }

      // Wrap xhr in a Promise to make it awaitable
      const uploadPromise = new Promise<any | null>((resolve, reject) => {
        xhr.onload = () => {
          document.body.removeChild(dialogOuter);
          if (xhr.status === 200 && xhr.responseText) {
            resolve(xhr.responseText);
          } else {
            reject(`http-error-${xhr.status}`);
          }
        };

        xhr.onerror = () => {
          reject("upload-error");
        };

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.floor((e.loaded / e.total) * 100);
            line2.innerText = `${percent}%`;
            progressBg.style.width = `${percent}%`;
            progressBg.style.backgroundColor = "green";
          }
        };

        // Create FormData instance
        const formData = new FormData();
        formData.append("tourBodyImage", file);

        xhr.send(formData);
      });

      try {
        const response = await uploadPromise;
        const parsedResponse = JSON.parse(response); // Parse stringified JSON
        if (parsedResponse.data) callback(parsedResponse.data);
        else callback("");
      } catch (error) {
        callback(null, error as string);
      }
    };

    // Simulate editor initialization
    const editor = new window.RichTextEditor(refDiv.current, config);
    // console.log("Editor initialized with config:", config);

    editor.setHTMLCode(initialValue);
    editor.attachEvent("change", function () {
      onChange(editor.getHTMLCode().trim());
    });

    // Clean up on unmount
    return () => {
      // Destroy the editor if necessary
    };
  }, []);

  return (
    <div className="RichTextEditor">
      <header className="RichTextEditor-header">
        <div ref={refDiv}></div>
      </header>
    </div>
  );
};

export default RichTextEditor2;
