import { CurrencyDisplayNames, CurrencyEnum } from "@/app/lib/enums";
import { TourDateSuccessResponse } from "@/Types/ApiResponseType";
import { ChevronDown } from "react-feather";
import { useTranslation } from "react-i18next";
import { AccordionBody, AccordionHeader, AccordionItem } from "reactstrap";

const TourPriceItem = ({
  tourDateList,
  handleRemovePrice,
}: {
  tourDateList: TourDateSuccessResponse[];
  handleRemovePrice: Function;
}) => {
  const { t } = useTranslation("common");
  return (
    tourDateList.length &&
    tourDateList.map((tourDate) => (
      <AccordionItem
        key={tourDate.startDate.toString()}
        className={"bg-light-primary"}
      >
        <AccordionHeader
          targetId={tourDate.id.toString()}
          className={"bg-light-primary"}
        >
          <span className={"txt-primary"}>
            {tourDate.startDate.toDateString()}
          </span>
          <span>-</span>
          <span className={"txt-primary"}>
            {tourDate.endDate.toDateString()}
          </span>
          {<ChevronDown className={`svg-color "txt-primary"`} />}
        </AccordionHeader>
        <AccordionBody accordionId={tourDate.id.toString()}>
          <div className="todo-list-body custom-scrollbar">
            <ul id="todo-list">
              {tourDate.prices?.length > 0
                ? tourDate.prices?.map((price, index) => (
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
                            {
                              CurrencyDisplayNames[
                                price.currency as CurrencyEnum
                              ]
                            }
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
        </AccordionBody>
      </AccordionItem>
    ))
  );
};

export default TourPriceItem;
