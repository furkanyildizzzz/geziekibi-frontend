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

const loadScript = (src: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
};

function base64ToBlob(base64: string, type: string): Blob {
  // Replace URL-safe Base64 characters with standard Base64 characters
  let base64String = base64.replace(/-/g, "+").replace(/_/g, "/");

  // Add padding if needed
  const padding = base64String.length % 4;
  if (padding === 2) {
    base64String += "==";
  } else if (padding === 3) {
    base64String += "=";
  }

  const binaryString = window.atob(base64String);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return new Blob([bytes], { type: type });
}

// Function to upload base64 image and get the URL
const uploadImageToServer = async (base64Image: string) => {
  // Convert base64 string to a Blob
  const base64String = base64Image.split(",")[1];
  const blob = base64ToBlob(base64String, "image/jpeg");
  const file = new File([blob], "image.jpg", { type: "image/jpeg" });

  try {
    const response = await uploadSingleFile(file);

    if ("errorType" in response) {
      return "";
    }
    const { url } = response.data;
    return url; // Assuming the server returns { url: "image_url" }
  } catch (error) {
    console.error("Image upload error:", error);
    return "";
  }
};

const RichTextEditor: React.FC<{ onChange: Function }> = ({ onChange }) => {
  const { formValue } = useAppSelector((state) => state.addProduct);
  const refDiv = useRef<HTMLDivElement | null>(null);
  const rteRef = useRef<any>(null);
  const handleContentChange = async () => {
    if (!rteRef.current) return;

    let content = rteRef.current.getHTMLCode();
    const base64ImagePattern =
      /<img[^>]+src="data:image\/(png|jpeg|jpg);base64,([^"]+)"[^>]*>/g;

    const matches = [...content.matchAll(base64ImagePattern)];
    if (matches.length > 0) {
      for (const match of matches) {
        const base64Image = match[0].match(/src="([^"]+)"/)?.[1];
        if (base64Image) {
          const imageUrl = await uploadImageToServer(base64Image);
          if (imageUrl) {
            // Replace base64 image in editor content with the new image URL
            content = content.replace(base64Image, imageUrl);
          }
        }
      }
      rteRef.current.setHTMLCode(content);
    }
    onChange(content);
  };

  const initializeEditor = useCallback(async () => {
    try {
      await loadScript("/assets/js/rte.js");
      await loadScript("/assets/js/all_plugins.js");

      const RichTextEditor =
        window.RichTextEditor?.default || window.RichTextEditor;
      // rteRef.current.setHTMLCode(formValue.body);

      if (RichTextEditor && refDiv.current) {
        rteRef.current = new RichTextEditor(refDiv.current, null);
        rteRef.current.setHTMLCode(formValue.body);

        // Attach the onChange listener if available
        rteRef.current.attachEvent("change", handleContentChange);
      } else {
        console.error("RichTextEditor is not available on window");
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }, [formValue]);

  useEffect(() => {
    initializeEditor();

    return () => {
      // Clean up
      if (rteRef.current && typeof rteRef.current.off === "function") {
        rteRef.current.off("change", handleContentChange); // Adjust based on actual API
      }
    };
  }, [initializeEditor]);

  return (
    <div className="RichTextEditor">
      <header className="RichTextEditor-header">
        <div ref={refDiv}></div>
      </header>
    </div>
  );
};

export default RichTextEditor;
