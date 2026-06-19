export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "restaurant-qr-system");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dvozxoxm2/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  console.log("Cloudinary response:", data);

  return data.secure_url;
};