import React, { useState } from "react";
import styles from "../../styles/components/home/Upload.module.css";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const defaultSrc = "/me.jpeg";

export default function UploadImg(props) {
  const { show, ratio, setUploadData } = props;

  const [image, setImage] = useState(defaultSrc);
  const [cropper, setCropper] = useState();

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setUploadData(cropper.getCroppedCanvas().toDataURL());
      show(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.popUp}>
        <img
          className={styles.close}
          src="/cancelButton.svg"
          onClick={(_e) => show(false)}
        />
        <h1>Crop</h1>
        <div style={{ width: "100%" }}>
          <div className={styles.inputDiv}>
            <label className={styles.fileInput}>
              <input type="file" onChange={onChange} />
              Upload Image
            </label>
          </div>

          <Cropper
            style={{ height: "30vh", width: "100%" }}
            zoomTo={0}
            aspectRatio={ratio}
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => setCropper(instance)}
            guides={true}
          />
        </div>

        <div className={styles.btnSave} onClick={getCropData}>
          <p>Crop Image</p>
        </div>
      </div>
    </div>
  );
}
