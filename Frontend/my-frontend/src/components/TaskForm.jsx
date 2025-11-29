import { useState, useEffect } from "react";

export default function TaskForm({ onSubmit, initialValues }) {
  const [form, setForm] = useState(
    initialValues || {
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
    }
  );

  useEffect(() => {
    if (initialValues) {
      setForm(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow mb-4"
    >
      <h3 className="font-semibold mb-3 text-lg">
        {initialValues ? "Edit Task" : "Create Task"}
      </h3>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="block text-xs mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-xs mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
            required
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="block text-xs mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          rows={3}
        />
      </div>

      <div className="mt-3">
        <label className="block text-xs mb-1">Priority</label>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="border px-2 py-1 rounded"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
        {initialValues ? "Update" : "Create"}
      </button>
    </form>
  );
}
