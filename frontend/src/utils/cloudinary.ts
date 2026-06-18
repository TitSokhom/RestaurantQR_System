const CLOUD_NAME = "dvozxoxm2";
const UPLOAD_PRESET = "restaurant-qr-system";//ml_default restaurant-qr-system

export const uploadToCloudinary = async (
  file: File
): Promise<string> => {
  if (!file) {
    throw new Error("No file selected");
  }

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.error?.message ||
      "Cloudinary upload failed"
    );
  }

  return result.secure_url;
};