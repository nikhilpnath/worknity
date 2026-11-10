import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const API = axios.create({
  baseURL: API_URL,
  responseType: "json",
});

export const apiRequest = async ({ url, token, data, method }) => {
  try {
    const result = await API(url, {
      method: (method || "GET").trim().toUpperCase(),
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return result;
  } catch (error) {
    return (
      error?.response?.data || {
        success: false,
        status: "failed",
        error: error.message || "Network error. Please try again later.",
      }
    );
  }
};

export const handleFileUpload = async (uploadFile) => {
  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload_preset", "worknity");
  try {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "di93tppgj";
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.log(error);
  }
};

export const updateURl = ({
  pageNum,
  query,
  cmpLoc, //company location
  sort,
  navigate,
  location,
  jType,
  exp,
}) => {
  const params = new URLSearchParams();

  if (pageNum && pageNum > 1) {
    params.set("page", pageNum);
  }

  if (query) {
    params.set("search", query);
  }
  if (cmpLoc) {
    params.set("location", cmpLoc);
  }
  if (sort) {
    params.set("sort", sort);
  }
  if (jType) {
    params.set("jtype", jType);
  }
  if (exp) {
    params.set("exp", exp);
  }

  const newURL = `${location.pathname}?${params.toString()}`;
  navigate(newURL, { replace: true });

  return newURL;
};
