import { Href } from "@/Constant/constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { addToCartData } from "@/Redux/Reducers/CartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "reactstrap";
import { FileDataType } from "./FileListItem";
import { Catalog } from "@/Types/ApiResponseType";

export interface HoverButtonsProp {
  item: Catalog;
  setDataId: (id: number) => void;
  setOpenPreviewModal: (key: boolean) => void;
  setOpenEditModal: (key: boolean) => void;
}

export const HoverButtons: React.FC<HoverButtonsProp> = ({
  item,
  setDataId,
  setOpenPreviewModal,
  setOpenEditModal,
}) => {
  const router = useRouter();

  const onClickPreview = (i: Catalog) => {
    setOpenPreviewModal(true);
    setDataId(i.id);
  };

  const onClickEdit = (i: Catalog) => {
    setOpenEditModal(true);
    setDataId(i.id);
  };

  return (
    <div className="product-hover">
      <ul>
        {item.id > 0 ? (
          <>
            <li>
              <Link
                href={Href}
                color="transparent"
                onClick={() => onClickEdit(item)}
              >
                <i className="icon-pencil"></i>
              </Link>
            </li>
            <li>
              <Link
                href={Href}
                color="transparent"
                onClick={() => onClickPreview(item)}
              >
                <i className="icon-eye"></i>
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link
              href={Href}
              color="transparent"
              onClick={() => onClickEdit(item)}
            >
              <i className="icon-pencil"></i>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};
