import { CurrencyDisplayNames, CurrencyEnum } from "@/app/lib/enums";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import { TourPriceSuccessResponse } from "@/Types/ApiResponseType";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Badge } from "reactstrap";

const TourPriceList = ({
  priceList,
  handleRemovePrice,
}: {
  priceList: TourPriceSuccessResponse[];
  handleRemovePrice: Function;
}) => {
  const { t } = useTranslation("common");

  return (
    <div className="todo-list-body custom-scrollbar">
      <ul id="todo-list">
        {priceList?.length > 0
          ? priceList?.map((price, index) => (
              <li className={`task`} key={price.rowId}>
                <div className="task-container row">
                  <div className="col-sm-3" style={{ flexGrow: "1" }}>
                    <h4 className="task-label">{price.name}</h4>
                  </div>
                  <div className="col-sm-2" style={{ flexGrow: "1" }}>
                    <h4 className="task-label">{price.price}</h4>
                  </div>
                  <div className="col-sm-1" style={{ flexGrow: "1" }}>
                    <h4 className="task-label">
                      {CurrencyDisplayNames[price.currency as CurrencyEnum]}
                    </h4>
                  </div>
                  <div className="col-sm-3">
                    <h4 className="task-label">{price.description}</h4>
                  </div>
                  <div className="col-sm-1">
                    <div className="d-flex align-items-center">
                      <span
                        className="task-action-btn"
                        onClick={() => handleRemovePrice(price.rowId)}
                      >
                        <span
                          className="action-box large delete-btn"
                          title={t("DeletePrice")}
                        >
                          <i className="icon">
                            <i className="icon-trash"></i>
                          </i>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};
export default TourPriceList;
