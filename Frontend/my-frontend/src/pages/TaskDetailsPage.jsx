import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api.js";
import TaskForm from "../components/TaskForm.jsx";

export default function TaskDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  const fetchTask = async () => {
    try {
      const res = await API.get(`/tasks/${id}`);
      setTask(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleUpdateTask = async (data) => {
    try {
      await API.put(`/tasks/${id}`, data);
      await fetchTask();
      alert("Task updated");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  if (!task) return <p className="p-4">Loading...</p>;

  return (
  <div className="max-w-3xl mx-auto py-6 px-3">
    <button
      onClick={() => navigate(-1)}
      className="text-sm text-blue-600 mb-4 hover:underline"
    >
      ← Back
    </button>

    <TaskForm
      onSubmit={handleUpdateTask}
      initialValues={{
        title: task.title,
        description: task.description || "",
        dueDate: task.dueDate?.slice(0, 10),
        priority: task.priority,
      }}
    />

    <div className="mt-4 bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-lg mb-1">Task Details</h3>

      <p className="text-sm mb-2">
        <span className="font-semibold">Description:</span><br />
        {task.description || "No description provided"}
      </p>

      <p className="text-sm mb-1">
        <span className="font-semibold">Status:</span> {task.status}
      </p>

      <p className="text-sm mb-1">
        <span className="font-semibold">Assigned To:</span> {task.assignedTo?.name}
      </p>

      <p className="text-xs text-gray-500 mt-2">
        Created at: {new Date(task.createdAt).toLocaleString()}
      </p>
    </div>
  </div>
);

}
