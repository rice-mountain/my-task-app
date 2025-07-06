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

// タスク一覧を取得
export const fetchTasks = async (): Promise<Task[]> => {
  const snapshot = await getDocs(tasksCol);
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Task, "id">),
  }));
};

// タスクを追加
export const addTask = async (task: Omit<Task, "id">) => {
  await addDoc(tasksCol, task);
};

// タスクを更新
export const updateTask = async (id: string, task: Partial<Omit<Task, "id">>) => {
  await updateDoc(doc(db, "tasks", id), task);
};

// タスクを削除
export const deleteTask = async (id: string) => {
  await deleteDoc(doc(db, "tasks", id));
};

// ✅ Firestoreにテストデータを追加する関数
export  const addTestTaskToFirestore = async () => {
    try {
      await addDoc(collection(db, "tasks"), {
        title: "テストタスク",
        completed: false,
        createdAt: new Date(),
      });
      alert("✅ Firestore に追加されました！");
    } catch (e) {
      console.error("❌ Firestore追加失敗:", e);
      alert("❌ Firestoreへの追加に失敗しました");
    }
  };