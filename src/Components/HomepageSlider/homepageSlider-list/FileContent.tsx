import { Card, CardHeader } from "reactstrap";
import SearchNotFoundClass from "@/Components/SearchNotFound/SearchNotFoundClass";
import { FileListData } from "@/Data/FileManager/FileManagerData";
import { ChangeEvent, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import AddUploadMedia from "./AddUploadMedia";
import FileManagerBody from "./FileManagerBody";
import FileListItem from "./FileListItem";
import CatalogPreviewModal from "./CatalogPreviewModal";
import CatalogEditModal from "./HomepageSliderEditModal";
import { getCatalogList } from "@/app/actions/catalog/getCatalogList";
import ShowError from "@/Components/Toast/Error/ShowError";
import { HomepageSliderSuccessResponse } from "@/Types/ApiResponseType";
import { getHomepageSliderList } from "@/app/actions/homepageSlider/getHomepageSliderList";

const FileContent = () => {
  const [searchFile, setSearchFile] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [myFile, setMyFile] = useState(FileListData);
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [dataId, setDataId] = useState<number>(1);
  const [lastOrderNumber, setLastOrderNumber] = useState<number>(1);

  const [existingFiles, setExistingFiles] = useState<
    HomepageSliderSuccessResponse[]
  >([]);

  const onCloseModal = () => {
    fetchExistingFiles();
  };

  const fileList = existingFiles
    .filter(
      (data) =>
        searchFile === "" ||
        data.order.toString().toLowerCase().includes(searchFile.toLowerCase())
    )
    .sort((a, b) => a.order - b.order)
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
    const response = await getHomepageSliderList();
    if ("errorMessage" in response) {
      ShowError(response.errorMessage);
    } else {
      console.log(response);
      setExistingFiles(response.data);
    }
  };

  useEffect(() => {
    fetchExistingFiles();
  }, []);

  useEffect(() => {
    if (existingFiles.length > 0) {
      const sortedFiles = [...existingFiles].sort((a, b) => b.order - a.order);
      setLastOrderNumber(sortedFiles[0].order);
    } else {
      setLastOrderNumber(1);
    }
  }, [existingFiles]);

  return (
    <Card>
      <CardHeader>
        <div className="d-md-flex d-sm-block">
          <SearchBar searchFile={searchFile} setSearchFile={setSearchFile} />
          <AddUploadMedia
            onFileUpload={onCloseModal}
            lastOrderNumber={lastOrderNumber + 1}
          />
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
      {/* {openPreviewModal && (
        <CatalogPreviewModal
          value={openPreviewModal}
          setOpenModal={setOpenPreviewModal}
          dataId={dataId}
        />
      )} */}

      {openEditModal && (
        <CatalogEditModal
          value={openEditModal}
          setOpenModal={setOpenEditModal}
          dataId={dataId}
          onFileUpload={onCloseModal}
        />
      )}
    </Card>
  );
};

export default FileContent;
