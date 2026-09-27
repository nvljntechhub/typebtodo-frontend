import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import UndoIcon from "@mui/icons-material/Undo";
import {
  ActionGroup,
  ComposerInput,
  DoneTitle,
  EditFields,
  IconAction,
  TaskBody,
  TaskDescription,
  TaskRow,
  TaskTitleButton,
} from "@/components/styled/dashboard";
import type { Todo, UpdateTodoDto } from "@/service/dto/todo.dto";

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
      description: description.trim() || null,
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
            <ComposerInput
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
            <ComposerInput
              value={description}
              onChange={(event) => setDescription(event.target.value)}
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
                htmlInput: {
                  maxLength: 2000,
                  "aria-label": "Description, optional",
                },
              }}
              placeholder="Description, optional"
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
            {task.description ? (
              <TaskDescription>{task.description}</TaskDescription>
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
