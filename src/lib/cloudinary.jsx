  'use react'



import axios from "axios";

const CLOUD_NAME = "YOUR_CLOUD_NAME";
const UPLOAD_PRESET = "YOUR_UPLOAD_PRESET";

export const uploadImage = async (image) => {
  const formData = new FormData();

  formData.append("file", image);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    formData
  );

  return response.data.secure_url;
};

export const uploadMultipleImages = async (images) => {
  const urls = [];

  for (const image of images) {
    const url = await uploadImage(image);
    urls.push(url);
  }

  return urls;
};