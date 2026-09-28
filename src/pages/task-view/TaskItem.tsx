import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import UndoIcon from "@mui/icons-material/Undo";
import RichTextInput from "@/components/Inputs/RichTextInput";
import TextInput from "@/components/Inputs/TextInput";
import {
  ActionGroup,
  DoneTitle,
  EditFields,
  IconAction,
  TaskBody,
  TaskDescription,
  TaskRow,
  TaskTitleButton,
} from "@/components/styled/dashboard";
import type { Todo, UpdateTodoDto } from "@/service/dto/todo.dto";
import { isEmptyRichText, richTextToPlainText } from "@/utils/rich-text.utils";

type TaskItemProps = {
  task: Todo;
  divided: boolean;
  undo?: boolean;
  onToggle: () => void;
  onUpdate: (id: string, payload: UpdateTodoDto) => Promise<boolean>;
  onDelete: () => void;
};

export default function TaskItem({
  task,
  divided,
  undo,
  onToggle,
  onUpdate,
  onDelete,
}: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");

  const beginEdit = () => {
    setTitle(task.title);
    setDescription(task.description ?? "");
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  const saveEdit = async () => {
    const nextTitle = title.trim();
    if (!nextTitle) return;

    const saved = await onUpdate(task.id, {
      title: nextTitle,
      description: isEmptyRichText(description) ? null : description,
    });
    if (saved) setEditing(false);
  };

  return (
    <TaskRow divided={divided} editing={editing}>
      <IconAction
        aria-label={task.done ? "Mark open" : "Mark completed"}
        onClick={onToggle}
        size="small"
        sx={editing ? { mt: "6px" } : undefined}
      >
        {task.done ? (
          <CheckCircleIcon fontSize="small" />
        ) : (
          <RadioButtonUncheckedIcon fontSize="small" />
        )}
      </IconAction>
      {editing ? (
        <>
          <EditFields>
            <TextInput
              label="Title"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  void saveEdit();
                }
                if (event.key === "Escape") {
                  event.preventDefault();
                  cancelEdit();
                }
              }}
              slotProps={{
                htmlInput: { maxLength: 255, "aria-label": "Task title" },
              }}
              autoFocus
            />
            <RichTextInput
              label="Description"
              placeholder="Description, optional"
              value={description}
              maxLength={2000}
              onChange={setDescription}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  event.preventDefault();
                  cancelEdit();
                }
              }}
            />
          </EditFields>
          <ActionGroup sx={{ mt: "6px" }}>
            <IconAction aria-label="Save" onClick={() => void saveEdit()} size="small">
              <CheckIcon fontSize="small" />
            </IconAction>
            <IconAction aria-label="Cancel" onClick={cancelEdit} size="small">
              <CloseIcon fontSize="small" />
            </IconAction>
          </ActionGroup>
        </>
      ) : (
        <>
          <TaskBody>
            {undo ? (
              <DoneTitle style={{ padding: 0, flex: "none", width: "100%" }}>
                {task.title}
              </DoneTitle>
            ) : (
              <TaskTitleButton
                type="button"
                onClick={beginEdit}
                style={{ padding: 0, flex: "none", width: "100%" }}
              >
                {task.title}
              </TaskTitleButton>
            )}
            {task.description && !isEmptyRichText(task.description) ? (
              <TaskDescription>
                {richTextToPlainText(task.description)}
              </TaskDescription>
            ) : null}
          </TaskBody>
          <ActionGroup>
            {undo ? (
              <IconAction aria-label="Undo" onClick={onToggle} size="small">
                <UndoIcon fontSize="small" />
              </IconAction>
            ) : (
              <IconAction aria-label="Edit" onClick={beginEdit} size="small">
                <EditOutlinedIcon fontSize="small" />
              </IconAction>
            )}
            <IconAction aria-label="Delete" onClick={onDelete} size="small">
              <DeleteOutlinedIcon fontSize="small" />
            </IconAction>
          </ActionGroup>
        </>
      )}
    </TaskRow>
  );
}
