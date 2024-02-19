import axios from "./axios";

const postRequest = async (data, endpoint) => {
  try {
    const response = await axios.post(`/${endpoint}`, data);
    console.log("Server response:", response.data);
    return { status: true, data: response.data };
  } catch (error) {
    console.error("Error sending request:", error.response.data.message);
    return { status: false };
  }
};

export { postRequest };
