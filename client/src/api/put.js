import axios from "./axios";

const putRequest = async (data, endpoint) => {
  try {
    const response = await axios.put(`/${endpoint}`, data);
    console.log("Server response:", response.data);
    return { status: true, data: response.data };
  } catch (error) {
    console.error("Error sending request:", error.response.data.message);
    return { status: false };
  }
};

export { putRequest };
