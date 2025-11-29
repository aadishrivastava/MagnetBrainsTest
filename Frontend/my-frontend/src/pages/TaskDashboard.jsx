import { useEffect, useState } from "react";
import API from "../api.js";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";

export default function TaskDashboard() {
  const [tasksData, setTasksData] = useState({
    tasks: [],
    page: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);

  const fetchTasks = async (page = 1) => {
    setLoading(true);
    try {
      const res = await API.get(`/tasks?page=${page}&limit=9`);
      setTasksData({
        tasks: res.data.tasks,
        page: res.data.page,
        totalPages: res.data.totalPages,
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (data) => {
    try {
      await API.post("/tasks", data);
      fetchTasks(tasksData.page);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await API.patch(`/tasks/${id}/status`, { status });
      fetchTasks(tasksData.page);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handlePriorityChange = async (id, priority) => {
    try {
      await API.patch(`/tasks/${id}/priority`, { priority });
      fetchTasks(tasksData.page);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks(tasksData.page);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handlePageChange = (p) => {
    fetchTasks(p);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-3">
      <TaskForm onSubmit={handleCreateTask} />

      {loading ? (
        <p className="mt-4">Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasksData.tasks}
          page={tasksData.page}
          totalPages={tasksData.totalPages}
          onPageChange={handlePageChange}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}
