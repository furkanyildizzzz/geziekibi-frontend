import Link from "next/link";
import { Container, Row, Col, BreadcrumbItem, Breadcrumb } from "reactstrap";
import SVG from "../SVG/Svg";

interface propsTypes {
  pageTitle: string;
  parent: string;
  title: string;
}

const Breadcrumbs: React.FC<propsTypes> = (props) => {
  return (
    <Container fluid>
      <div className="page-title">
        <Row>
          <Col sm="6" className="p-0">
            <h3>{props.pageTitle}</h3>
          </Col>
          <Col sm="6" className="p-0">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link href="/dashboard/default">
                  <SVG className="stroke-icon" iconId="stroke-home" />
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>{props.parent}</BreadcrumbItem>
              <BreadcrumbItem active>{props.title}</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
      </div>
    </Container>
  );
};
export default Breadcrumbs;
