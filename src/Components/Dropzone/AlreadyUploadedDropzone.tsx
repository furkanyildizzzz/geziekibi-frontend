import { CloudinaryImage } from "@/Types/ApiResponseType";
import React from "react";

interface DropzoneProps {
  images: CloudinaryImage[];
  onRemove: Function;
}

const DeleteButton = ({
  publicId,
  onRemove,
}: {
  publicId: string;
  onRemove: Function;
}) => {
  return (
    <svg
      className="files-ui-file-icon"
      xmlns="http://www.w3.org/2000/svg"
      height="15px"
      viewBox="0 0 24 24"
      width="15px"
      fill="rgba(255,255,255,0.851)"
      style={{ cursor: "pointer" }}
      onClick={() => onRemove(publicId)}
    >
      <path d="M0 0h24v24H0V0z" fill="transparent"></path>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
    </svg>
  );
};

const AlreadyUploadedDropzone: React.FC<DropzoneProps> = ({
  images,
  onRemove,
}) => {
  return (
    <div className="fui-dropzone-root fui-dropzone-border files-ui-dropzone-extra-16 clickable">
      <div className="filesui-base-ripple-absolute" style={{ display: "none" }}>
        <div className="filesui-base-ripple-relative"></div>
      </div>
      <div className="files-ui-dropzone-children-container">
        {images.map((s: CloudinaryImage) => (
          <div
            key={s.publicId}
            className="files-ui-file-mosaic-main-container files-ui-tooltip"
          >
            <div className="files-ui-file-mosaic-icon-layer-container files-ui-layer-container">
              <div className="files-ui-file-mosaic-image-layer blur files-ui-layer">
                <img width="100%" src={s.url} />
              </div>
              <div className="files-ui-file-mosaic-image-layer files-ui-layer">
                <img
                  height="100%"
                  src={s.url}
                  alt={`preview`}
                  style={{ borderRadius: "0px" }}
                />
              </div>
              <div className="files-ui-file-mosaic-main-layer files-ui-layer">
                <div className="file-mosaic-main-layer-header">
                  <DeleteButton publicId={s.publicId} onRemove={onRemove} />
                </div>
                <div className="file-mosaic-main-layer-footer">
                  <div className="file-mosaic-footer-left">
                    <div
                      className={`files-ui-file-item-status-container ${
                        status === "Valid"
                          ? "file-status-ok"
                          : "file-status-error"
                      }`}
                    >
                      {" "}
                    </div>
                    <div className="filesui-file-item-size"></div>
                  </div>
                  <div className="file-mosaic-footer-right"></div>
                </div>
              </div>
            </div>
            <div className="files-ui-file-mosaic-file-name">
              <span>{s.originalName}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="dropzone-layer-default"></div>
      <input
        aria-label="fui-hidden-input"
        accept=""
        type="file"
        style={{ display: "none" }}
      />
    </div>
  );
};

export default AlreadyUploadedDropzone;
