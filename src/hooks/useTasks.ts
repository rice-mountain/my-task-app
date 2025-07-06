// hooks/useTasks.ts
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Task } from "../types/task";
import { defaultTasks } from "../data/defaultTasks";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  const addTask = (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    setTasks((prev) => [
      ...prev,
      { ...task, id: uuidv4(), createdAt: now, updatedAt: now },
    ]);
  };

  const updateTask = (
    id: string,
    task: Omit<Task, "id" | "createdAt" | "updatedAt">
  ) => {
    const now = new Date().toISOString();
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...task, updatedAt: now } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  
  return { tasks, addTask, updateTask, deleteTask};
};
