import { Cancel, Edit } from "@/Constant/constant";
import { t } from "i18next";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button, Col, Row } from "reactstrap";

interface ModalButtonsProps {
  isLoading?: boolean;
}

export const ModalButtons: React.FC<ModalButtonsProps> = ({ isLoading }) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <Row style={{ justifyContent: "flex-end" }}>
      <Col xs="3">
        <Button
          color="light"
          onClick={() => {
            router.back();
          }}
          disabled={isLoading}
        >
          {" "}
          {t("Cancel")}
        </Button>
      </Col>
      <Col xs="3">
        <Button color="primary" type="submit" disabled={isLoading}>
          {" "}
          {t("Submit")}
        </Button>
      </Col>
    </Row>
  );
};
