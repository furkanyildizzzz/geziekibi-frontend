import React, { useEffect, useRef } from "react";
import "../../../public/assets/css/rte_theme_default.css";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

//https://richtexteditor.net/document/index.htm?page=html/configuring-toolbar.htm
//https://richtexteditor.com/docs/default.aspx

// Extend window interface to recognize `RichTextEditor`
declare global {
  interface Window {
    RichTextEditor: any;
    RTE_CreateConfig: any;
    RTE_DefaultConfig: any;
    RichTextEditor_OnLoad?: () => void;
  }
}

const RichTextEditor2: React.FC<{
  initialValue: string;
  uploadFolderPath: string;
  onChange: (text: string) => void;
}> = ({ initialValue, uploadFolderPath, onChange }) => {

  const refDiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!refDiv.current) return;

    // Simulate the RichTextEditor instantiation with config
    const config = {
      DisabledItems: null,
      onLoad: () => alert("editor loaded"),
      file_upload_handler: (
        file: any,
        callback: any,
        optionalIndex: any,
        optionalFiles: any
      ) => { },
    };

    function getCookie(name: string) {
      const token = Cookies.get("token");
      console.log({ token });
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      console.log({ parts });
      // return token;
      if (parts.length === 2) return parts.pop()!.split(";").shift();
    }

    config.file_upload_handler = async function fileUploadHandler(
      file: File,
      callback: (response: string | null, error?: string) => void,
      optionalIndex?: number,
      optionalFiles?: File[]
    ): Promise<void> {
      const uploadHandlerPath = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${uploadFolderPath}`;

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

      // ✅ HttpOnly Cookie'nin otomatik gönderilmesi için eklenmeli!
      xhr.withCredentials = true;

      // // Set the Authorization header
      // const token = getCookie("token");
      // console.log({ token });

      // if (token) {
      //   xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      // }

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
        formData.append("uploadBodyImage", file);

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

    // // Simulate editor initialization
    // const editor = new window.RichTextEditor(refDiv.current, config);
    // console.log("Editor initialized with config:", config);
    // console.log("Editor :", editor);

    // editor.setHTMLCode(initialValue);
    // editor.attachEvent("change", function () {
    //   onChange(editor.getHTMLCode().trim());
    // });

    // // editable ve focus kontrolü
    // const iframe = editor.iframe as HTMLIFrameElement;
    // if (iframe?.contentDocument) {
    //   iframe.contentDocument.designMode = "on";
    //   iframe.contentDocument.body.contentEditable = "true";
    //   iframe.contentWindow?.focus();
    // }

    // // Clean up on unmount
    // return () => {
    //   // Destroy the editor if necessary
    // };

    const timer = setTimeout(() => {
      console.log("window :", window);
      console.log("RTE_CreateConfig :", window.RTE_CreateConfig(config));
      var defaultConfig = window.RTE_DefaultConfig;
      const editor = new window.RichTextEditor(refDiv.current!, { defaultConfig, ...config });
      console.log("Editor :", editor);
      console.log("editor.iframe.contentDocument.designMode :", editor.iframe.contentDocument.designMode);
      console.log("editor.attachEvent :", editor.attachEvent.toString());
      console.log("isCommandEnabled('bold') :", editor.isCommandEnabled("bold"));
      console.log("isCommandActive('bold') :", editor.isCommandActive("bold"));
      console.log("isCommandEnabled('code') :", editor.isCommandEnabled("code"));
      console.log("isCommandActive('code') :", editor.isCommandActive("code"));
      
      // editor.attachEvent("ready", () => {
      //   console.log("Editor is ready!");
      //   editor.setHTMLCode(initialValue);

      //   const iframe = editor.iframe as HTMLIFrameElement;
      //   if (iframe?.contentDocument) {
      //     iframe.contentDocument.designMode = "on";
      //     iframe.contentDocument.body.contentEditable = "true";
      //     iframe.contentWindow?.focus();
      //   }
      // });
     
      // editor.attachEvent("load", () => {
      //   toast("editor loaded");
      // });

      // change event
      editor.attachEvent("change", () => {
        onChange(editor.getHTMLCode().trim());
      });

      // editable ve focus kontrolü
      const iframe = editor.iframe as HTMLIFrameElement;
      if (iframe?.contentDocument) {
        console.log("iframe?.contentDocument :", iframe?.contentDocument);
        iframe.contentDocument.designMode = "on";
        iframe.contentDocument.body.contentEditable = "true";
        iframe.contentWindow?.focus();
      }
    }, 1000);

    return () => clearTimeout(timer);

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
