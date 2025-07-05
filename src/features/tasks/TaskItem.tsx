import type { Task } from "../../types/task";
import { Card, Text, Button, Group, Badge, Stack } from "@mantine/core";
import { format } from "date-fns";
type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

const statusColor = {
  todo: "gray",
  "in-progress": "orange",
  done: "green",
} as const;

const TaskItem = ({ task, onEdit, onDelete }: Props) => {
  return (
    <Card withBorder shadow="sm" radius="md" mb="md">
      <Stack gap="xs">
        <Group justify="space-between">
          <Text fw={600}>{task.title}</Text>
          <Badge color={statusColor[task.status]}>{task.status}</Badge>
        </Group>
        <Text size="xs" c="dimmed">
          create: {format(new Date(task.createdAt), "yyyy/MM/dd HH:mm")}
        </Text>
        <Text size="xs" c="dimmed">
          update: {format(new Date(task.updatedAt), "yyyy/MM/dd HH:mm")}
        </Text>
        <Text size="xs" c="dimmed">
          {task.description}
        </Text>
        <Group justify="flex-end" mt="xs">
          <Button
            size="xs"
            variant="light"
            color="blue"
            onClick={() => onEdit(task)}
          >
            編集
          </Button>
          <Button
            size="xs"
            variant="light"
            color="red"
            onClick={() => onDelete(task.id)}
          >
            削除
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

export default TaskItem;
