import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CompletedBlock, CompletedToggle } from "@/components/styled/dashboard";
import TaskItem from "@/pages/task-view/TaskItem";
import type { Todo, UpdateTodoDto } from "@/service/dto/todo.dto";

type CompletedTasksProps = {
  tasks: Todo[];
  onUpdate: (id: string, payload: UpdateTodoDto) => Promise<boolean>;
  open: boolean;
  searching?: boolean;
  onToggleOpen: () => void;
  onToggleTask: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function CompletedTasks({
  tasks,
  open,
  searching = false,
  onToggleOpen,
  onUpdate,
  onToggleTask,
  onDelete,
}: CompletedTasksProps) {
  if (tasks.length === 0) return null;

  const expanded = open || searching;

  return (
    <CompletedBlock>
      <CompletedToggle
        type="button"
        onClick={() => {
          if (!searching) onToggleOpen();
        }}
        aria-expanded={expanded}
      >
        <ExpandMoreIcon
          sx={{ transform: expanded ? "rotate(180deg)" : "none" }}
        />
        {searching
          ? `Completed · ${tasks.length}`
          : `${open ? "Hide completed" : "Show completed"} · ${tasks.length}`}
      </CompletedToggle>
      {expanded
        ? tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              divided={index < tasks.length - 1}
              undo
              onToggle={() => onToggleTask(task.id)}
              onUpdate={onUpdate}
              onDelete={() => onDelete(task.id)}
            />
          ))
        : null}
    </CompletedBlock>
  );
}
