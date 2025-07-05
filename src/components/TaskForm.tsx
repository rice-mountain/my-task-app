import { useState } from "react";
import { Button, TextInput, Textarea, Select, Stack } from "@mantine/core";
import type { Task } from "../types/task";

type Props = {
  onSubmit: (task: Omit<Task, "id">) => void;
  initial?: Omit<Task, "id">;
  isEdit?: boolean;
};

const TaskForm = ({ onSubmit, initial, isEdit = false }: Props) => {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [status, setStatus] = useState<Task["status"]>(
    initial?.status || "todo"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setTitle("");
    setDescription("");
    setStatus("todo");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput
          label="タイトル"
          placeholder="タスク名を入力"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          required
        />
        <Textarea
          label="詳細"
          placeholder="詳細を入力"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
        <Select
          label="ステータス"
          value={status}
          onChange={(value) => setStatus(value as Task["status"])}
          data={[
            { value: "todo", label: "To Do" },
            { value: "in-progress", label: "In Progress" },
            { value: "done", label: "Done" },
          ]}
        />
        <Button type="submit" color="blue">
          {isEdit ? "更新" : "追加"}
        </Button>
      </Stack>
    </form>
  );
};

export default TaskForm;
