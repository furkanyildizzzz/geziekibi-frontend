import { LoadingButton } from "@/Components/Button/Loading";
import { Cancel, Edit } from "@/Constant/constant";
import { t } from "i18next";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { Button, Col, Row } from "reactstrap";

interface ModalButtonsProps {
  isLoading?: boolean;
  deleteFunction?: Function;
}

export const ModalButtons: React.FC<ModalButtonsProps> = ({
  isLoading,
  deleteFunction,
}) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const handleDelete = async () => {
    if (deleteFunction) deleteFunction();
  };
  return (
    <Row>
      <Col>
        <Row>
          {deleteFunction && (
            <Col xs="3">
              <Button
                color="danger"
                onClick={handleDelete}
                disabled={isLoading}
              >
                {" "}
                {t("Delete")}
              </Button>
            </Col>
          )}
        </Row>
      </Col>
      <Col>
        <Row>
          <Col xs="6">
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
          <Col xs="6">
            <Button
              className="ms-2"
              color="primary"
              type="submit"
              disabled={isLoading}
            >
              {" "}
              <div className="d-flex align-items-center gap-sm-2 gap-1">
                {isLoading ? <LoadingButton /> : t("Submit")}
              </div>
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
