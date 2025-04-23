import { TourServiceTypeEnum } from "@/app/lib/enums";
import { UpgradeSpanText, UpgradeTitle } from "@/Constant/constant";
import {
  ServiceSuccessResponse,
  TourServiceSuccessResponse,
} from "@/Types/ApiResponseType";
import { useTranslation } from "react-i18next";
import { Col, Input } from "reactstrap";

export const UpgradeVariationData = [
  {
    id: 1,
    text: "Voxo",
    sales: "270 Sales",
  },
  {
    id: 2,
    text: "Cuba",
    sales: "4.8K Sales",
  },
  {
    id: 3,
    text: "Multikart",
    sales: "2.6k Sales",
  },
  {
    id: 4,
    text: "Viho",
    sales: "2k Sales",
    check: true,
  },
];

interface ServicesBox {
  title: string;
  textColor: string;
  services: ServiceSuccessResponse[];
  removeItemFromList: Function;
}

const ServicesBox: React.FC<ServicesBox> = ({
  title,
  textColor,
  services,
  removeItemFromList,
}) => {
  const { t } = useTranslation("common");

  return (
    <div className="card-wrapper border rounded-3 h-100 checkbox-checked">
      <div>
        <h5 className="mb-2">
          <span className={`txt-${textColor}`}>{title}</span>
        </h5>
      </div>
      <div className="variation-box">
        {services.map(({ id, name }, index) => (
          <div className="payment-wrapper" key={index}>
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-2">
              <span className="flex-grow-1">{name}</span>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger px-2 py-1 d-flex align-items-center"
                style={{
                  fontSize: "0.75rem",
                  lineHeight: "1",
                  verticalAlign: "middle",
                }}
                onClick={() =>
                  removeItemFromList(TourServiceTypeEnum.INHERIT, id, name)
                }
              >
                <i className="icon-trash me-1"></i> {t("Remove")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesBox;
