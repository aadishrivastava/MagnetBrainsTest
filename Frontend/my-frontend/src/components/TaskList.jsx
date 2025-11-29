import { Link } from "react-router-dom";

const priorityStyles = {
  high: "border-l-4 border-red-500 bg-red-50",
  medium: "border-l-4 border-yellow-500 bg-yellow-50",
  low: "border-l-4 border-green-500 bg-green-50",
};

export default function TaskList({
  tasks,
  page,
  totalPages,
  onPageChange,
  onStatusChange,
  onPriorityChange,
  onDelete,
}) {
  const grouped = {
    high: tasks.filter((t) => t.priority === "high"),
    medium: tasks.filter((t) => t.priority === "medium"),
    low: tasks.filter((t) => t.priority === "low"),
  };

  const renderList = (list, label) => (
    <div className="flex-1">
      <h3 className="font-semibold mb-2 text-sm md:text-base">
        {label} ({list.length})
      </h3>

      <div className="space-y-2">
        {list.map((task) => (
          <div
            key={task._id}
            className={`p-3 rounded shadow-sm flex justify-between items-start ${priorityStyles[task.priority]}`}
          >
            <div>
              <Link
                to={`/tasks/${task._id}`}
                className="font-semibold hover:underline"
              >
                {task.title}
              </Link>

              {task.description && (
                <p className="text-xs text-gray-700 mt-1">
                  {task.description.length > 50
                    ? task.description.slice(0, 50) + "..."
                    : task.description}
                </p>
              )}

              <p className="text-xs text-gray-600 mt-1">
                Due: {task.dueDate?.slice(0, 10)} | Status:{" "}
                <span className="uppercase text-[11px] font-medium">
                  {task.status}
                </span>
              </p>

              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <select
                  value={task.status}
                  onChange={(e) => onStatusChange(task._id, e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <select
                  value={task.priority}
                  onChange={(e) => onPriorityChange(task._id, e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this task?"
                  )
                ) {
                  onDelete(task._id);
                }
              }}
              className="text-xs text-red-600 hover:text-red-800 ml-3"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3 mb-4">
        {renderList(grouped.high, "High Priority")}
        {renderList(grouped.medium, "Medium Priority")}
        {renderList(grouped.low, "Low Priority")}
      </div>

      <div className="flex justify-center items-center gap-3 mt-4">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 text-sm"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {page} of {totalPages || 1}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 text-sm"
        >
          Next
        </button>
      </div>
    </>
  );
}
