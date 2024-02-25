import { useEffect, useState } from "react";
import { validateTaskTitle } from "../utils/validation/validateTaskTitle";
import { postRequest } from "../api/post";
import { getRequest } from "../api/get";
import { putRequest } from "../api/put";
import { Link, useNavigate, useParams } from "react-router-dom";

const TaskFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [validateInputError, setValidateInputError] = useState({});
  const [newTaskStatus, setNewTaskStatus] = useState({
    status: false,
    message: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValidateInputError((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const taskTitleValidation = validateTaskTitle(
      formData.title,
      setValidateInputError
    );

    if (taskTitleValidation) {
      setNewTaskStatus((prev) => ({ ...prev, message: "Loading..." }));

      let taskRequest;

      const data = formData.description
        ? formData
        : { ...formData, description: "No Description" };

      if (id) {
        taskRequest = await putRequest(data, "tasks/" + id);
      } else {
        taskRequest = await postRequest(data, "tasks");
      }

      if (taskRequest.status) {
        setNewTaskStatus({
          status: true,
          message: `Task succesfully ${id ? "edited" : "created"}!`,
        });

        setTimeout(() => navigate("/"), 500);
      } else {
        setNewTaskStatus({
          status: false,
          message: `Network Error: The task has not been ${
            id ? "edited" : "created"
          }.`,
        });
      }
    }
  };

  useEffect(() => {
    if (newTaskStatus.message && newTaskStatus.message != "Loading...") {
      const timeoutId = setTimeout(() => {
        setNewTaskStatus({
          status: false,
          message: null,
        });
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [newTaskStatus]);

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const taskRequest = await getRequest("tasks/" + id);
        if (taskRequest.status) {
          const { title, description } = taskRequest.data;

          setFormData({
            title: title,
            description: description === "No Description" ? "" : description,
          });
        } else {
          console.log("Network Error: Failed to fetching task");
        }
      };

      fetchTask();
    }
  }, [id]);

  return (
    <div className="sm:w-1/2 md:w-1/3 rounded-md dark-bg p-5">
      <h1 className="mb-5 text-2xl">{id ? "" : "New"} Task:</h1>
      <form
        className="w-full flex flex-col items-center justify-between gap-5"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <input
            className="w-full p-2 rounded-md text-sm light-bg text-white opacity-75 hover:opacity-100"
            onChange={handleInputChange}
            type="text"
            name="title"
            value={formData.title}
            placeholder="Title"
            maxLength={50}
          />
          {validateInputError.title && (
            <p className="text-red-400 pt-2 pl-1 text-xs">
              {validateInputError.title}
            </p>
          )}
        </div>
        <div className="w-full">
          <textarea
            className="w-full min-h-16 max-h-80 p-2 rounded-md text-sm light-bg text-white opacity-75 hover:opacity-100"
            onChange={handleInputChange}
            rows="3"
            name="description"
            value={formData.description}
            placeholder="Description"
            maxLength={500}
          />
          {validateInputError.description && (
            <p className="text-red-400 pt-2 pl-1 text-xs">
              {validateInputError.description}
            </p>
          )}
        </div>
        {newTaskStatus.message && (
          <p
            className={`${
              newTaskStatus.message === "Loading..."
                ? "text-gray-400"
                : newTaskStatus.status && id
                ? "text-blue-400"
                : newTaskStatus.status
                ? "text-green-400"
                : "text-red-400"
            } pt-2 pl-1 text-sm`}
          >
            {newTaskStatus.message}
          </p>
        )}
        <div className="w-full flex items-center justify-between">
          <Link
            to="/"
            className="main-bg opacity-75 hover:opacity-100 text-sm p-3 hover:scale-105 rounded-md self-end"
            type="button"
          >
            <i className="bi bi-arrow-return-left" /> BACK
          </Link>
          <button
            className={`main-bg opacity-75 hover:opacity-100 text-sm p-3 hover:scale-105  hover:text-${
              id ? "blue" : "green"
            }-400 rounded-md self-end`}
            type="submit"
          >
            <i className={`bi bi-${id ? "pencil-square" : "plus-lg"}`} />{" "}
            {id ? "EDIT" : "ADD"} TASK
          </button>
        </div>
      </form>
    </div>
  );
};

export { TaskFormPage };
