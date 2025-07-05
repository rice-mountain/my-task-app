import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import type { Task } from "../types/task";

const tasksCol = collection(db, "tasks");

export const fetchTasks = async (): Promise<Task[]> => {
  const snapshot = await getDocs(tasksCol);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Task));
};

export const addTask = async (task: Omit<Task, "id">) => {
  await addDoc(tasksCol, task);
};

export const updateTask = async (id: string, task: Partial<Task>) => {
  await updateDoc(doc(tasksCol, id), task);
};

export const deleteTask = async (id: string) => {
  await deleteDoc(doc(tasksCol, id));
};