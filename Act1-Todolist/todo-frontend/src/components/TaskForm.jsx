// todo-frontend/src/components/TaskForm.jsx
import { useState, useEffect } from "react";

export default function TaskForm({ selectedTask, setTasks, onTaskSaved }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (selectedTask) setText(selectedTask.title);
    else setText("");
  }, [selectedTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const method = selectedTask ? "PUT" : "POST";
      const url = selectedTask
        ? `http://localhost:3000/tasks/${selectedTask._id}`
        : "http://localhost:3000/tasks";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: text }),
      });

      if (!res.ok) throw new Error("Failed to save task");
      const task = await res.json();

      if (selectedTask) {
        setTasks((prev) => prev.map((t) => (t._id === task._id ? task : t)));
      } else {
        setTasks((prev) => [...prev, task]);
      }

      setText("");
      onTaskSaved();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Enter your task here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
        className="task-input"
      />
      <button className="add-btn" onClick={handleSubmit}>
        {selectedTask ? "Update" : "Add"}
      </button>
    </div>
  );
}
