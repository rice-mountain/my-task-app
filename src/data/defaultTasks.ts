import type { Task } from "../types/task";

const now = new Date().toISOString();

export const defaultTasks: Task[] = [
  {
    id: "1",
    title: "UIデザインの確認",
    description: "Figmaのデザインをレビューする",
    status: "todo",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "2",
    title: "API連携実装",
    description: "バックエンドとPOST/GET連携",
    status: "in-progress",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "3",
    title: "テストケース作成",
    description: "Jestでユニットテストを用意",
    status: "done",
    createdAt: now,
    updatedAt: now,
  },
];
