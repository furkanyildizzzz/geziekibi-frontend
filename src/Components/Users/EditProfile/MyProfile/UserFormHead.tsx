import { Designer, ImagePath } from "@/Constant/constant";
import { useEffect, useState } from "react";
import { Row } from "reactstrap";
import styled from "styled-components";
import EditProfilePrimaryImages from "../EditProfiles/EditProfilePrimaryImages";
import { CloudinaryImage, UserSuccessResponse } from "@/Types/ApiResponseType";

const ProfileWrapper = styled.div`
  position: relative;
  width: 70px;
  height: 70px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .hover-buttons {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover .hover-buttons {
    opacity: 1;
  }

  .btn {
    background: white;
    color: black;
    border: none;
    font-size: 12px;
    padding: 5px 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #ddd;
    }

    .upload-input {
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: 8px;
    }
  }
`;

export const UserFormHead = ({ user }: { user: UserSuccessResponse }) => {
  const [showUploadInput, setShowUploadInput] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<CloudinaryImage>();
  const handlePreviewClick = () => {
    setPreviewVisible(true);
  };

  const handleEditClick = () => {
    setShowUploadInput(true);
  };

  const handleSuccessUpload = (image: CloudinaryImage) => {
    setProfileImage(image);
  };

  const handleSuccessRemove = (image: CloudinaryImage) => {
    setProfileImage(undefined);
  };

  useEffect(() => {
    if (user) setProfileImage(user.profileImage);
  }, [user]);

  return (
    <Row>
      <div className="profile-title">
        <div className="d-flex">
          <ProfileWrapper>
            <picture>
              <img
                className="img-70 rounded-circle"
                alt=""
                src={
                  profileImage ? profileImage.url : `${ImagePath}/user/7.jpg`
                }
              />
            </picture>
            <div className="hover-buttons">
              <button
                type="button"
                className="btn"
                onClick={handlePreviewClick}
              >
                <i className="icofont icofont-open-eye"></i>
              </button>
              <button type="button" className="btn" onClick={handleEditClick}>
                <i className="icofont icofont-pencil-alt-5"></i>
              </button>
            </div>
          </ProfileWrapper>
          <div className="flex-grow-1">
            <h3 className="mb-1 text-uppercase">{user?.fullName}</h3>
            <p>{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Picture Preview Modal */}
      {previewVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setPreviewVisible(false)}
        >
          <img
            src={profileImage ? profileImage.url : `${ImagePath}/user/7.jpg`}
            alt="Preview"
            style={{
              maxWidth: "80%",
              maxHeight: "80%",
              borderRadius: "10px",
            }}
          />
        </div>
      )}

      {/* Picture Preview Modal */}
      {showUploadInput && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          // onClick={() => setShowUploadInput(false)}
        >
          <EditProfilePrimaryImages
            setShowUploadInput={setShowUploadInput}
            userProfileImage={profileImage}
            handleSuccessUpload={handleSuccessUpload}
            handleSuccessRemove={handleSuccessRemove}
          />
        </div>
      )}
    </Row>
  );
};
