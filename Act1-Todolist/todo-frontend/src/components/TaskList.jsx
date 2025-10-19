import { useState } from "react";
import { FaEdit, FaTrashAlt, FaCheckCircle, FaTimesCircle, FaRegCircle } from "react-icons/fa";

export default function TaskList({ tasks, setTasks }) {
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditingText(task.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const saveEdit = async (id) => {
    if (!editingText.trim()) return;
    try {
      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editingText }),
      });
      const updatedTask = await res.json();
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task))
      );
      cancelEdit();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCompleted = async (task) => {
    try {
      const res = await fetch(`http://localhost:3000/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      const updatedTask = await res.json();
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? updatedTask : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const renderTask = (task) => (
    <li key={task._id} className="task-item">
      {editingId === task._id ? (
        <div className="inline-edit-inline">
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            className="inline-input"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit(task._id);
              else if (e.key === "Escape") cancelEdit();
            }}
          />
          <button onClick={() => saveEdit(task._id)} className="check-btn" aria-label="Save">
            <FaCheckCircle />
          </button>
          <button onClick={cancelEdit} className="cancel-btn" aria-label="Cancel">
            <FaTimesCircle />
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={() => toggleCompleted(task)}
            className={task.completed ? "check-btn" : "mark-btn"}
            aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {task.completed ? <FaCheckCircle /> : <FaRegCircle />}
          </button>

          <span className="task-text">
            {task.title}
          </span>

          <div className="task-buttons">
            <button onClick={() => startEdit(task)} className="edit-btn">
              <FaEdit />
            </button>
            <button onClick={() => deleteTask(task._id)} className="delete-btn">
              <FaTrashAlt />
            </button>
          </div>
        </>
      )}
    </li>
  );

  return (
    <div>
      <h3 className="title">Active Tasks</h3>
      {activeTasks.length ? (
        <ul>
          {activeTasks.map(renderTask)}
        </ul>
      ) : (
        <p className="no-tasks">No active tasks</p>
      )}

      <h3 className="title">Completed Tasks</h3>
      {completedTasks.length ? (
        <ul>
          {completedTasks.map(renderTask)}
        </ul>
      ) : (
        <p className="no-tasks">No completed tasks</p>
      )}
    </div>
  );
}