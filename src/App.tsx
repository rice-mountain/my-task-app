import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import type { Task } from "./types/task";
import TaskList from "./features/tasks/TaskList";
import TaskForm from "./components/TaskForm";
import EditTaskPage from "./components/EditTaskPage";
import TaskDetail from "./components/TaskDetail";
// default tasks data
import { defaultTasks } from "./data/defaultTasks";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const navigate = useNavigate();

  const addTask = (task: Omit<Task, "id">) => {
    const now = new Date().toISOString();
    setTasks((prev) => [
      ...prev,
      { ...task, id: uuidv4(), createdAt: now, updatedAt: now },
    ]);
    navigate("/");
  };

  const updateTask = (
    id: string,
    task: Omit<Task, "id" | "createdAt" | "updatedAt">
  ) => {
    const now = new Date().toISOString();
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...task, updatedAt: now } : t))
    );
    navigate("/");
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 20 }}>
      <h1>タスク管理アプリ</h1>
      <Routes>
        <Route
          path="/"
          element={
            <TaskList
              tasks={tasks}
              onDelete={deleteTask}
              onEdit={(task) => navigate(`/edit/${task.id}`)}
              onAdd={() => navigate("/add")}
            />
          }
        />
        <Route path="/add" element={<TaskForm onSubmit={addTask} />} />
        <Route
          path="/edit/:id"
          element={<EditTaskPage tasks={tasks} onUpdate={updateTask} />}
        />
        <Route path="/detail/:id" element={<TaskDetail tasks={tasks} />} />
      </Routes>
    </div>
  );
};

export default App;
