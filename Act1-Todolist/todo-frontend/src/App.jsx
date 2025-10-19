// todo-frontend/src/App.jsx
import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <h1 className="title">My To-Do</h1>

      <TaskForm
        selectedTask={selectedTask}
        setTasks={setTasks}
        onTaskSaved={() => setSelectedTask(null)}
      />

      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        onEdit={(task) => setSelectedTask(task)}
      />
    </div>
  );
}

export default App;
