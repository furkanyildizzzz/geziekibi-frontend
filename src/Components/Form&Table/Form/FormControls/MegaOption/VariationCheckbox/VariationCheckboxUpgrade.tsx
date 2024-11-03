import { UpgradeSpanText, UpgradeTitle } from "@/Constant/constant";
import { ServiceSuccessResponse } from "@/Types/ApiResponseType";
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
  services: { id: number; name: string; selected: string }[];
}

const ServicesBox: React.FC<ServicesBox> = ({ title, textColor, services }) => {
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
            <div
              className="payment-first"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <span>{name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesBox;
