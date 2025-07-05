import { Table, Button, Badge } from "@mantine/core";
import type { Task } from "../../types/task";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
type Props = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

const statusColor = {
  todo: "gray",
  "in-progress": "orange",
  done: "green",
} as const;

const TaskTable = ({ tasks, onEdit, onDelete }: Props) => {
  const navigate = useNavigate();

  const rows = tasks.map((task) => (
    <Table.Tr key={task.id}>
      <Table.Td>
        <Button
          size="xs"
          variant="light"
          onClick={() => navigate(`/detail/${task.id}`)}
        >
          詳細
        </Button>
      </Table.Td>
      <Table.Td>{task.title}</Table.Td>
      <Table.Td>{task.description}</Table.Td>
      <Table.Td>
        <Badge color={statusColor[task.status]}>{task.status}</Badge>
      </Table.Td>
      <Table.Td>
        {format(new Date(task.createdAt), "yyyy/MM/dd HH:mm")}
      </Table.Td>
      <Table.Td>
        {format(new Date(task.updatedAt), "yyyy/MM/dd HH:mm")}
      </Table.Td>
      <Table.Td>
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
          ml="xs"
          onClick={() => onDelete(task.id)}
        >
          削除
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table highlightOnHover withTableBorder style={{ minWidth: 900 }}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>タイトル</Table.Th>
          <Table.Th>詳細</Table.Th>
          <Table.Th>ステータス</Table.Th>
          <Table.Th>作成日</Table.Th>
          <Table.Th>更新日</Table.Th>
          <Table.Th>操作</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default TaskTable;
