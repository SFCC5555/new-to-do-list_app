import axios from "./axios";

const getRequest = async (endpoint) => {
  try {
    const response = await axios.get(`/${endpoint}`);
    console.log("Server response:", response.data);
    return { status: true, data: response.data };
  } catch (error) {
    console.error("Error sending request:", error.response.data.message);
    return { status: false };
  }
};

export { getRequest };
