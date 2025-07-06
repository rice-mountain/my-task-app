// hooks/useTasks.ts
import { useState, useEffect, useCallback } from "react";
import type { Task } from "../types/task";
import {
  fetchTasks as fetchTasksRepo,
  addTask as addTaskRepo,
  updateTask as updateTaskRepo,
  deleteTask as deleteTaskRepo,
} from "../data/taskRepository";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = useCallback(async () => {
    const data = await fetchTasksRepo();
    setTasks(data);
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = async (
    task: Omit<Task, "id" | "createdAt" | "updatedAt">,
  ) => {
    const now = new Date().toISOString();
    await addTaskRepo({ ...task, createdAt: now, updatedAt: now });
    await loadTasks();
  };

  const updateTask = async (
    id: string,
    task: Omit<Task, "id" | "createdAt" | "updatedAt">,
  ) => {
    const now = new Date().toISOString();
    await updateTaskRepo(id, { ...task, updatedAt: now });
    await loadTasks();
  };

  const deleteTask = async (id: string) => {
    await deleteTaskRepo(id);
    await loadTasks();
  };

  return { tasks, addTask, updateTask, deleteTask };
};
