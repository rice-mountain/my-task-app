export type Task = {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  createdAt: string;
  updatedAt: string;
  dueDate?: Date; // 期限日をDate型に変更
  priority?: "low" | "medium" | "high";
  category?: string;
};
