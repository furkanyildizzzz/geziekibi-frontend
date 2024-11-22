import { CloudinaryImage } from "@/Types/ApiResponseType";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface DropzoneProps {
  images: CloudinaryImage[];
  onRemove: Function;
  onReorder: (newOrder: CloudinaryImage[]) => void; // Callback to update the order
}

const RemoveButton = ({
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

const ApprovedButton = ({
  publicId,
  onApprove,
}: {
  publicId: string;
  onApprove: Function;
}) => {
  return (
    <svg
      className="files-ui-file-icon"
      xmlns="http://www.w3.org/2000/svg"
      height="15px"
      viewBox="0 0 24 24"
      width="15px"
      fill="rgba(0, 255, 0, 0.85)" // Green color for approval
      style={{ cursor: "pointer" }}
      onClick={() => onApprove(publicId)}
    >
      <path d="M0 0h24v24H0V0z" fill="transparent"></path>
      <path d="M9 16.2l-3.5-3.5L4 14l5 5 10-10-1.4-1.4z"></path>
    </svg>
  );
};

const AlreadyUploadedDropzone: React.FC<DropzoneProps> = ({
  images,
  onRemove,
  onReorder,
}) => {
  const [imageList, setImageList] = useState(images);

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    // If there's no destination, exit
    if (!destination) return;

    // Reorder the images
    const reorderedImages = Array.from(imageList);
    const [movedImage] = reorderedImages.splice(source.index, 1);
    reorderedImages.splice(destination.index, 0, movedImage);

    setImageList(reorderedImages);
    onReorder(reorderedImages); // Notify parent component of the new order
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="image-list" direction="horizontal">
        {(provided) => (
          <div
            className="fui-dropzone-root fui-dropzone-border files-ui-dropzone-extra-16 clickable"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="files-ui-dropzone-children-container">
              {imageList.map((s: CloudinaryImage, index) => (
                <Draggable
                  key={s.publicId}
                  draggableId={s.publicId}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="files-ui-file-mosaic-main-container files-ui-tooltip"
                    >
                      <div className="files-ui-file-mosaic-icon-layer-container files-ui-layer-container">
                        {s.order == 1 && (
                          <div
                            className="files-ui-file-mosaic-main-layer files-ui-layer"
                            title="Vitrin resim"
                          >
                            <div className="file-mosaic-main-layer-header">
                              {/* Approved Button (Top-Left Corner) */}
                              <div
                                style={{
                                  position: "absolute",
                                  top: "1px",
                                  left: "1px",
                                  zIndex: 2,
                                }}
                              >
                                <ApprovedButton
                                  publicId={s.publicId}
                                  onApprove={() =>
                                    console.log("Approved:", s.publicId)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )}

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
                            <RemoveButton
                              publicId={s.publicId}
                              onRemove={onRemove}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="files-ui-file-mosaic-file-name">
                        <span>{s.originalName}</span>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
            <div className="dropzone-layer-default"></div>
            <input
              aria-label="fui-hidden-input"
              accept=""
              type="file"
              style={{ display: "none" }}
            />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default AlreadyUploadedDropzone;
