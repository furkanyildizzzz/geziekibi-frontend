import { CatalogListData } from "@/Types/ProjectType";
import { Card } from "reactstrap";
import { HoverButtons } from "./HoverButtons";
import { ProductItemInterface } from "@/Types/EcommerceType";
import { useAppSelector } from "@/Redux/Hooks";
import { useState } from "react";
import { getVisibleProducts } from "@/utils/Ecommerce.service";
import { ImagePath } from "@/Constant/constant";
import {
  Catalog,
  HomepageSliderSuccessResponse,
} from "@/Types/ApiResponseType";

export interface FileDataType {
  id: number;
  name: string;
  icon: string;
  title: string;
}

export interface CatalogItemProp {
  item: HomepageSliderSuccessResponse;
  setDataId: (id: number) => void;
  setOpenPreviewModal: (key: boolean) => void;
  setOpenEditModal: (key: boolean) => void;
}

const FileListItem: React.FC<CatalogItemProp> = ({
  item,
  setDataId,
  setOpenPreviewModal,
  setOpenEditModal,
}) => {
  return (
    <li className="folder-box" key={item.id} title={"Geziekibi"}>
      <Card className="rounded-4 card-content">
        <div className="product-box product-box-2">
          <div className="product-img bg-img-cover">
            <img
              className="img-fluid"
              src={item.image?.url}
              alt=""
              width={300}
              height={300}
            />

            <HoverButtons
              setDataId={setDataId}
              setOpenPreviewModal={setOpenPreviewModal}
              setOpenEditModal={setOpenEditModal}
              item={item}
            />
          </div>
          <div className="order-container">
            <strong>Sıra:</strong> {item.order}
            <strong>Aktif Mi:</strong>
            <input
              type="checkbox"
              checked={item.isActive} // Assuming 'isActive' is a boolean in the item object
              className="order-checkbox"
            />
          </div>
        </div>
      </Card>
    </li>
  );
};

export const GetCloudinaryPdfFileFirstPageAsImange = (originalUrl: string) => {
  const transformation = "f_jpg/pg_1";
  const uploadIndex = originalUrl.indexOf("/upload/");

  if (uploadIndex === -1) {
    return "";
    throw new Error("Invalid Cloudinary URL: Missing '/upload/' segment.");
  }

  // Insert the transformation after '/upload/'
  const beforeUpload = originalUrl.slice(0, uploadIndex + 8); // Includes '/upload/'
  const afterUpload = originalUrl.slice(uploadIndex + 8);

  return `${beforeUpload}${transformation}/${afterUpload}`;
};

export default FileListItem;
