import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import RichTextInput from "@/components/Inputs/RichTextInput";
import TextInput from "@/components/Inputs/TextInput";
import { ComposerForm, ComposerStack } from "@/components/styled/dashboard";
import type { CreateTodoDto } from "@/service/dto/todo.dto";
import { isEmptyRichText } from "@/utils/rich-text.utils";

type TodoComposerProps = {
  onCreate: (payload: CreateTodoDto) => Promise<boolean>;
};

export default function TodoComposer({ onCreate }: TodoComposerProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async () => {
    const nextTitle = title.trim();
    if (!nextTitle) return;

    const created = await onCreate({
      title: nextTitle,
      ...(!isEmptyRichText(description) ? { description } : {}),
    });
    if (!created) return;

    setTitle("");
    setDescription("");
  };

  return (
    <ComposerForm>
      <ComposerStack>
        <TextInput
          label="Title"
          required
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
        <RichTextInput
          label="Description"
          placeholder="Description, optional"
          value={description}
          maxLength={2000}
          onChange={setDescription}
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
