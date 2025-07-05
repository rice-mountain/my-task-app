import { useParams } from "react-router-dom";
import type { Task } from "../types/task";
import TaskForm from "./TaskForm";

type Props = {
  tasks: Task[];
  onUpdate: (id: string, task: Omit<Task, "id">) => void;
};

const EditTaskPage = ({ tasks, onUpdate }: Props) => {
  const { id } = useParams<{ id: string }>();

  const task = tasks.find((t) => t.id === id);

  if (!task) return <p>タスクが見つかりません</p>;

  return (
    <div>
      <h2>タスクを編集</h2>
      <TaskForm
        onSubmit={(updated) => onUpdate(task.id, updated)}
        initial={task}
        isEdit
      />
    </div>
  );
};

export default EditTaskPage;
