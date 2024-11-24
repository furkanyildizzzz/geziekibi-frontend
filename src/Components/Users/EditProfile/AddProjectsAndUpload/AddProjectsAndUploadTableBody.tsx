import { Delete, Edit, Href, Update } from "@/Constant/constant";
import { AddProjectAndUpload } from "@/Data/Applications/Users/UsersData";
import { Button } from "reactstrap";

const AddProjectsAndUploadTableBody = () => {
  return (
    <tbody>
      {AddProjectAndUpload.map((data, index) => (
        <tr key={index}>
          <td className="add-project ps-3"><a className="text-inherit" href={Href}>Untrammelled Prevents</a></td>
          <td>{data.date}</td>
          <td><span className={`status-icon ${data.statusClass}`} /> {data.status}</td>
          <td>{data.price}</td>
          <td className="text-end">
            <Button color="primary" tag="a" size="sm" href={Href}><i className="fa fa-pencil" /> {Edit}</Button>
            <Button color="transparent" tag="a" size="sm" href={Href}><i className="fa fa-link" /> {Update}</Button>
            <Button color="danger" tag="a" size="sm" href={Href}><i className="fa fa-trash" /> {Delete}</Button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default AddProjectsAndUploadTableBody;
