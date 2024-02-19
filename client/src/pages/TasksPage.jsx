import { useEffect, useState } from "react";
import { getRequest } from "../api/get";
import { Link } from "react-router-dom";
import { deleteRequest } from "../api/delete";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksRequest = await getRequest("tasks");
      if (tasksRequest.status) {
        setTasks(tasksRequest.data);
      } else {
        setError("Network Error");
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    await deleteRequest("tasks/" + id);

    const tasksRequest = await getRequest("tasks");
    if (tasksRequest.status) {
      setTasks(tasksRequest.data);
    } else {
      setError("Network Error");
    }
  };

  return (
    <main className="flex flex-col w-full sm:w-1/2 p-5 gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg">
          {" "}
          {tasks.length} Task{tasks.length === 1 ? "" : "s"}:
        </h2>
        <Link
          to="/add-task"
          className="light-bg opacity-75 hover:opacity-100 text-md p-3 hover:scale-105  hover:text-green-400 rounded-md self-end"
        >
          <i className="bi bi-plus-circle-dotted" /> Create a New Task!
        </Link>
      </div>

      {tasks?.map((task) => (
        <div
          className="w-full flex flex-col justify-between rounded-md dark-bg p-5 gap-5"
          key={task._id}
        >
          <div className="flex items-center justify-between pb-2 border-b-2 main-border">
            <h3>{task.title}</h3>
            <div className="flex items-center justify-between gap-5">
              <button
                onClick={() => deleteTask(task._id)}
                className="main-bg opacity-75 hover:opacity-100 text-xs px-3 py-2 hover:scale-105 hover:text-red-400 rounded-md"
              >
                <i className="bi bi-trash-fill" /> Delete
              </button>
              <Link
                to={`edit-task/${task._id}`}
                className="main-bg opacity-75 hover:opacity-100 text-xs px-3 py-2 hover:scale-105 hover:text-blue-400 rounded-md"
              >
                <i className="bi bi-pencil-square" /> Edit
              </Link>
            </div>
          </div>

          <p
            className={`${
              task.description === "No Description" ? "opacity-10" : ""
            }`}
          >
            {task.description}
          </p>
        </div>
      ))}
      {error && <p>{error}</p>}
    </main>
  );
};

export { TasksPage };
