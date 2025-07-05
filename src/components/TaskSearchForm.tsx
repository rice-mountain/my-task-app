import { SegmentedControl, TextInput, Group, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useState, useEffect } from "react";

type SearchConditions = {
  status: string;
  title: string;
  createdAt: string | null;
  updatedAt: string | null;
};

type Props = {
  onSearch: (conditions: SearchConditions) => void;
};

const TaskSearchForm = ({ onSearch }: Props) => {
  const [status, setStatus] = useState("all");
  const [title, setTitle] = useState("");
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    onSearch({ status, title, createdAt, updatedAt });
  }, [status, title, createdAt, updatedAt]);

  return (
    <Stack mb="md">
      <SegmentedControl
        fullWidth
        size="sm"
        value={status}
        onChange={setStatus}
        data={[
          { label: "すべて", value: "all" },
          { label: "To Do", value: "todo" },
          { label: "In Progress", value: "in-progress" },
          { label: "Done", value: "done" },
        ]}
      />

      <Group grow align="end">
        <TextInput
          label="タイトル"
          placeholder="タイトルを入力"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />

        <DateInput
          label="作成日"
          type="string"
          value={createdAt}
          onChange={setCreatedAt}
          valueFormat="YYYY-MM-DD"
          clearable
        />

        <DateInput
          label="更新日"
          type="string"
          value={updatedAt}
          onChange={setUpdatedAt}
          valueFormat="YYYY-MM-DD"
          clearable
        />
      </Group>
    </Stack>
  );
};

export default TaskSearchForm;
