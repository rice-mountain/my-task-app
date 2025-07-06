// src/routes/AppRoutes.tsx
import { Routes, Route, useNavigate } from "react-router-dom";
import type { Task } from "../types/task";
import TaskList from "../features/tasks/TaskList";
import TaskForm from "../pages/TaskForm";
import EditTaskPage from "../pages/EditTaskPage";
import TaskDetail from "../pages/TaskDetail";

type AppRoutesProps = {
  tasks: Task[];
  onAdd: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  onUpdate: (id: string, task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  onDelete: (id: string) => void;
};

const AppRoutes = ({ tasks, onAdd, onUpdate, onDelete }: AppRoutesProps) => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <TaskList
            tasks={tasks}
            onDelete={onDelete}
            onEdit={(task) => navigate(`/edit/${task.id}`)}
            onAdd={() => navigate("/add")}
          />
        }
      />
      <Route
        path="/add"
        element={
          <TaskForm
            onSubmit={(task) => {
              onAdd(task);
              navigate("/");
            }}
          />
        }
      />
      <Route
        path="/edit/:id"
        element={
          <EditTaskPage
            tasks={tasks}
            onUpdate={(id, task) => {
              onUpdate(id, task);
              navigate("/");
            }}
          />
        }
      />
      <Route path="/detail/:id" element={<TaskDetail tasks={tasks} />} />
    </Routes>
  );
};

export default AppRoutes;
