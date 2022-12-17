import React, { useContext } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { PlusOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../Context/authContext";
import { Upload } from "antd";
import "jodit";
import "jodit/build/jodit.min.css";
import JoditEditor from "jodit-react";
import { Input } from "antd";
import "./style.css";

const { TextArea } = Input;

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const ShareModal = ({
  postDetails,
  setImage,
  setdescp,
  setContent,
  content,
}) => {
  const { isMobileView } = useContext(AuthContext);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobileView ? 650 : 1700,
    height: 880,
    boxShadow: 54,
  };

  const buttons = [
    "undo",
    "redo",
    "|",
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "superscript",
    "subscript",
  ];

  const editorConfig = {
    readonly: false,
    language: "en",
    toolbarButtonSize: "medium",
    toolbarAdaptive: false,
    buttons: buttons,
    nl2brInPlainText: false,
    height: isMobileView ? 40 : 120,
    width: isMobileView ? 350 : 915,
    theme: "dark",
    allowResizeX: false,
    allowResizeY: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
  };

  const handleChange = (info) => {
    if (info.fileList[0] === undefined) {
    } else {
      setImage(info.fileList[0]?.originFileObj);
    }
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <div>
      <Box sx={style}>
        <div className="modal-objects">
          <div className="inner-share-modal">
            <div className="title-share-container">
              <TextArea
                maxLength={100}
                style={{
                  height: isMobileView ? 70 : 120,
                  width: isMobileView ? 350 : 800,
                  fontSize: isMobileView ? 30 : 50,
                  resize: "none",
                }}
                onChange={(e) => setdescp(e.target.value)}
                placeholder="New post title here..."
                bordered={false}
              />
            </div>
            <div className="middle-share-container">
              <div className="jodit-container">
                <JoditEditor
                  className="jodit-editor"
                  value={content}
                  onBlur={(newContent) => setContent(newContent)}
                  config={editorConfig}
                />
              </div>
            </div>
            <div className="create-post-button-container">
              <div className="upload-image-preview-container">
                <Upload
                  listType="picture-card"
                  onChange={handleChange}
                  customRequest={dummyRequest}
                  maxCount={1}
                >
                  {uploadButton}
                </Upload>
              </div>
              <div>
                {!isMobileView && (
                  <Button onClick={postDetails} className="create-post-button">
                    Create Post
                  </Button>
                )}
              </div>
            </div>
            {isMobileView && (
              <Button onClick={postDetails} className="create-post-button">
                Create Post
              </Button>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default ShareModal;
