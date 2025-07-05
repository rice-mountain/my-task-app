import { useParams, useNavigate } from "react-router-dom";
import type { Task } from "../types/task";
import { format } from "date-fns";
import { Card, Text, Button, Stack, Badge } from "@mantine/core";

type Props = {
  tasks: Task[];
};

const TaskDetail = ({ tasks }: Props) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const task = tasks.find((t) => t.id === id);
  if (!task) return <Text>タスクが見つかりません</Text>;

  return (
    <Card withBorder shadow="sm">
      <Stack gap="md">
        <Text fw="bold" size="lg">
          {task.title}
        </Text>
        <Text>{task.description}</Text>
        <Badge color="gray" variant="light">
          {task.status}
        </Badge>
        <Text size="xs" c="dimmed">
          作成日: {format(new Date(task.createdAt), "yyyy/MM/dd HH:mm")}
        </Text>
        <Text size="xs" c="dimmed">
          更新日: {format(new Date(task.updatedAt), "yyyy/MM/dd HH:mm")}
        </Text>
        <Button onClick={() => navigate(-1)}>← 戻る</Button>
      </Stack>
    </Card>
  );
};

export default TaskDetail;
