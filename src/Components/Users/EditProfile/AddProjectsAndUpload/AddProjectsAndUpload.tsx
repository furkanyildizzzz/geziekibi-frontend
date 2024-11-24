import { Card, Col, Table } from "reactstrap";
import AddProjectsAndUploadTableBody from "./AddProjectsAndUploadTableBody";
import { AddProjectAndUpload } from "@/Constant/constant";
import { CommonCardHeader } from "@/Components/General/Widgets/Common/CommonCardHeader";

const AddProjectsAndUpload = () => {
  return (
    <Col md="12">
      <Card>
        <CommonCardHeader title={AddProjectAndUpload} headClass="pb-0" />
        <div className="table-responsive custom-scrollbar">
          <div className="table-responsive custom-scrollbar">
            <Table className="card-table table-vcenter text-nowrap">
              <thead>
                <tr>
                  <th className="ps-3">ProjectName</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th/>
                </tr>
              </thead>
              <AddProjectsAndUploadTableBody />
            </Table>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default AddProjectsAndUpload;
