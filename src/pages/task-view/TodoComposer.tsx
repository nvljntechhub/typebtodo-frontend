import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import {
  ComposerForm,
  ComposerInput,
  ComposerStack,
} from "@/components/styled/dashboard";
import type { CreateTodoDto } from "@/service/dto/todo.dto";

type TodoComposerProps = {
  onCreate: (payload: CreateTodoDto) => Promise<boolean>;
};

export default function TodoComposer({ onCreate }: TodoComposerProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async () => {
    const nextTitle = title.trim();
    if (!nextTitle) return;

    const nextDescription = description.trim();
    const created = await onCreate({
      title: nextTitle,
      ...(nextDescription ? { description: nextDescription } : {}),
    });
    if (!created) return;

    setTitle("");
    setDescription("");
  };

  return (
    <ComposerForm>
      <ComposerStack>
        <ComposerInput
          placeholder="Add a task"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              void submit();
            }
          }}
          slotProps={{
            htmlInput: { maxLength: 255, "aria-label": "Add a task" },
          }}
        />
        <ComposerInput
          placeholder="Description, optional"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              void submit();
            }
          }}
          slotProps={{
            htmlInput: {
              maxLength: 2000,
              "aria-label": "Description, optional",
            },
          }}
        />
      </ComposerStack>
      <Button
        variant="contained"
        onClick={() => void submit()}
        disabled={!title.trim()}
        startIcon={<AddIcon />}
      >
        Add
      </Button>
    </ComposerForm>
  );
}
