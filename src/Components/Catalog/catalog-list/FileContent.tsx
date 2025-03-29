import { Card, CardHeader } from "reactstrap";
import SearchNotFoundClass from "@/Components/SearchNotFound/SearchNotFoundClass";
import { FileListData } from "@/Data/FileManager/FileManagerData";
import { ChangeEvent, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import AddUploadMedia from "./AddUploadMedia";
import FileManagerBody from "./FileManagerBody";
import FileListItem from "./FileListItem";
import CatalogPreviewModal from "./CatalogPreviewModal";
import CatalogEditModal from "./CatalogEditModal";
import { getCatalogList } from "@/app/actions/catalog/getCatalogList";
import ShowError from "@/Components/Toast/Error/ShowError";
import { Catalog } from "@/Types/ApiResponseType";
import { useTranslation } from "react-i18next";

const FileContent = () => {
  const [searchFile, setSearchFile] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [myFile, setMyFile] = useState(FileListData);
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [dataId, setDataId] = useState<number>(0);

  const [existingFiles, setExistingFiles] = useState<Catalog[]>([]);

  const { t: tForm } = useTranslation("form");

  const onFileUpload = () => {
    fetchExistingFiles();
  };

  const fileList = existingFiles
    .filter(
      (data) =>
        searchFile === "" ||
        data.originalName.toLowerCase().includes(searchFile.toLowerCase())
    )
    .map((item, i) => (
      <FileListItem
        setDataId={setDataId}
        setOpenPreviewModal={setOpenPreviewModal}
        setOpenEditModal={setOpenEditModal}
        key={i}
        item={item}
      />
    ));

  const fetchExistingFiles = async () => {
    const response = await getCatalogList();
    if ("errorMessage" in response) {
      ShowError(tForm, response.errorMessage);
    } else {
      setExistingFiles(response.data);
    }
  };

  useEffect(() => {
    fetchExistingFiles();
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="d-md-flex d-sm-block">
          <SearchBar searchFile={searchFile} setSearchFile={setSearchFile} />
          <AddUploadMedia onFileUpload={onFileUpload} />
        </div>
      </CardHeader>
      {fileList.length ? (
        <FileManagerBody
          myFile={myFile}
          fileList={fileList}
          searchFile={searchFile}
        />
      ) : (
        <SearchNotFoundClass word="File" />
      )}
      {openPreviewModal && (
        <CatalogPreviewModal
          value={openPreviewModal}
          setOpenModal={setOpenPreviewModal}
          dataId={dataId}
        />
      )}

      {openEditModal && (
        <CatalogEditModal
          value={openEditModal}
          setOpenModal={setOpenEditModal}
          dataId={dataId}
        />
      )}
    </Card>
  );
};

export default FileContent;
