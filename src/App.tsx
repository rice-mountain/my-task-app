import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import { Box, Container } from "@mantine/core";
import type { Task } from "./types/task";
import TaskList from "./features/tasks/TaskList";
import TaskForm from "./components/TaskForm";
import EditTaskPage from "./components/EditTaskPage";
import TaskDetail from "./components/TaskDetail";
import { defaultTasks } from "./data/defaultTasks";
import AppNav from "./components/AppNav";
import SideNav from "./components/SideNav";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const navigate = useNavigate();
  const location = useLocation();

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
    <Box style={{ minHeight: "100vh", background: "#fff" }}>
      {/* 上部ナビ */}
      <AppNav />
      <Box style={{ display: "flex", paddingTop: 64, paddingLeft: 200 }}>
        <SideNav />
        <Box style={{ flex: 1 }}>
          {/* ContainerをBoxに変更し、余白を調整 */}
          <Box style={{ padding: "32px 24px" }}>
            <Box
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 32,
                boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                color: "#222",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Routes location={location} key={location.pathname}>
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
                </motion.div>
              </AnimatePresence>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
