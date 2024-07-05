import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function Cropper(props) {
  const defaultCrop = { aspect: 1, width: 200, height: 200 };
  const [crop, setCrop] = useState(defaultCrop);
  const [aspectRatio, setAspectRatio] = useState(1 / 1);
  const [CPImageUrl, setCPImageUrl] = useState();

  const cropFn = (c) => {
    setCrop(c);

    if (c.width && c.height) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = c.width;
      canvas.height = c.height;

      ctx.drawImage(
        document.querySelector("img"),
        c.x,
        c.y,
        c.width,
        c.height,
        0,
        0,
        c.width,
        c.height
      );

      const base64Image = canvas.toDataURL("image/jpeg");

      // Convert base64 to Blob
      const byteCharacters = atob(base64Image.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });

      const file = new File([blob], "cropped_image.jpg", {
        type: "image/jpeg",
      });
      const fileUrl = URL.createObjectURL(file);

      setCPImageUrl(fileUrl);
    }
  };

  const cropImage = (e) => {
    e.preventDefault();
    props.updateCroppedImageUrl(CPImageUrl);
  };

  const handleAspectRatioChange = (e) => {
    setAspectRatio(parseFloat(e.target.value));
  };


  return (
    <div style={{ margin: "auto" }}>
      <ReactCrop
        crop={crop}
        aspect={aspectRatio}
        onChange={(c) => cropFn(c)}>
        <img src={props.imageUrl} alt="cropped" />
      </ReactCrop>
      <br />
      <button onClick={cropImage}>Crop Image</button>
    </div>
  );
}

export default Cropper;
