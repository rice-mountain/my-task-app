import { useState, useMemo } from "react";
import type { Task } from "../../types/task";
import TaskItem from "./TaskItem";
import TaskTable from "./TaskTable";
import TaskSearchForm from "./TaskSearchForm";
import {
  Button,
  Group,
  Stack,
  Title,
  SegmentedControl,
  Text,
} from "@mantine/core";

type Props = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
};

type SearchConditions = {
  status: string;
  title: string;
  createdAt: string | null;
  updatedAt: string | null;
};

const TaskList = ({ tasks, onEdit, onDelete, onAdd }: Props) => {
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [filter, setFilter] = useState<SearchConditions>({
    status: "all",
    title: "",
    createdAt: null,
    updatedAt: null,
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter.status !== "all" && task.status !== filter.status)
        return false;
      if (filter.title && !task.title.includes(filter.title)) return false;
      if (filter.createdAt && !task.createdAt.startsWith(filter.createdAt))
        return false;
      if (filter.updatedAt && !task.updatedAt.startsWith(filter.updatedAt))
        return false;
      return true;
    });
  }, [tasks, filter]);

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>タスク一覧</Title>
        <SegmentedControl
          value={viewMode}
          onChange={(value) => setViewMode(value as "table" | "card")}
          data={[
            { label: "表形式", value: "table" },
            { label: "カード形式", value: "card" },
          ]}
          size="sm"
        />
      </Group>

      <Button color="teal" onClick={onAdd} w="fit-content">
        ＋ タスク追加
      </Button>

      <TaskSearchForm onSearch={setFilter} />

      {filteredTasks.length === 0 ? (
        <Text c="dimmed">条件に一致するタスクがありません</Text>
      ) : viewMode === "table" ? (
        <TaskTable tasks={filteredTasks} onEdit={onEdit} onDelete={onDelete} />
      ) : (
        <Stack>
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default TaskList;
