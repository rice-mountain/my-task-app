import React, { useState } from "react";
import type { Task } from "../types/task";
import { TextInput, Textarea, Select, Button, Group } from "@mantine/core";
import { DateInput } from "@mantine/dates";

type TaskFormProps = {
  onSubmit: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  initialTask?: Partial<Task>;
};

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialTask = {} }) => {
  const [title, setTitle] = useState(initialTask.title || "");
  const [description, setDescription] = useState(initialTask.description || "");
  const [dueDate, setDueDate] = useState<string | null>(
    initialTask.dueDate
      ? typeof initialTask.dueDate === "string"
        ? initialTask.dueDate
        : initialTask.dueDate.toISOString().slice(0, 10)
      : null
  );
  const [priority, setPriority] = useState<"low" | "medium" | "high">(initialTask.priority || "medium");
  const [category, setCategory] = useState(initialTask.category || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      status: initialTask.status || "todo",
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority,
      category,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        mb="sm"
      />
      <Textarea
        label="説明"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        mb="sm"
      />
      <DateInput
        label="期限日"
        value={dueDate}
        onChange={setDueDate}
        mb="sm"
        clearable
      />
      <Select
        label="優先度"
        value={priority}
        onChange={(v) => setPriority((v as "low" | "medium" | "high") || "medium")}
        data={[
          { value: "low", label: "低" },
          { value: "medium", label: "中" },
          { value: "high", label: "高" },
        ]}
        mb="sm"
      />
      <TextInput
        label="カテゴリー"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        mb="sm"
      />
      <Group  mt="md">
        <Button type="submit">保存</Button>
      </Group>
    </form>
  );
};

export default TaskForm;
