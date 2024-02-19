import axios from "./axios";

const deleteRequest = async (endpoint) => {
  try {
    const response = await axios.delete(`/${endpoint}`);
    console.log("Server response:", response.data);
    return { status: true };
  } catch (error) {
    console.error("Error sending request:", error.response.data.message);
    return { status: false };
  }
};

export { deleteRequest };
