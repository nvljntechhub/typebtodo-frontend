import { useEffect, useState } from "react";
import {
  ComposerInput,
  ListCard,
  ListContainer,
  ListLede,
  ListTitle,
  TaskList,
} from "@/components/styled/dashboard";
import FormAlert from "@/components/ui/Alert";
import { useAuth } from "@/context/auth-context";
import { useSnackbarAlert } from "@/hooks/useSnackbar";
import CompletedTasks from "@/pages/task-view/CompletedTasks";
import ProfileMenu from "@/pages/task-view/ProfileMenu";
import TaskItem from "@/pages/task-view/TaskItem";
import TodoComposer from "@/pages/task-view/TodoComposer";
import type { CreateTodoDto, Todo, UpdateTodoDto } from "@/service/dto/todo.dto";
import todoService from "@/service/todo.service";
import { handleApiError } from "@/utils/error-handler.utils";
import { richTextToPlainText } from "@/utils/rich-text.utils";
import { successMessages } from "@/utils/properties";

function matchesQuery(todo: Todo, query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return (
    todo.title.toLowerCase().includes(needle) ||
    richTextToPlainText(todo.description ?? "")
      .toLowerCase()
      .includes(needle)
  );
}

export default function TaskView() {
  const { showSuccess } = useSnackbarAlert();
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [query, setQuery] = useState("");
  const [showDone, setShowDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const todos = await todoService.getAll();
        if (active) setTasks(todos);
      } catch (loadError) {
        if (active) setError(handleApiError(loadError));
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const searching = query.trim().length > 0;
  const openTasks = tasks.filter((task) => !task.done);
  const open = openTasks.filter((task) => matchesQuery(task, query));
  const done = tasks.filter((task) => task.done && matchesQuery(task, query));

  const createTodo = async (payload: CreateTodoDto) => {
    setError(null);
    try {
      const created = await todoService.create(payload);
      setTasks((current) => [created, ...current]);
      showSuccess(successMessages.TASK_CREATED);
      return true;
    } catch (createError) {
      setError(handleApiError(createError));
      return false;
    }
  };

  const updateTodo = async (id: string, payload: UpdateTodoDto) => {
    setError(null);
    try {
      const updated = await todoService.update(id, payload);
      setTasks((current) =>
        current.map((task) => (task.id === updated.id ? updated : task)),
      );
      return true;
    } catch (updateError) {
      setError(handleApiError(updateError));
      return false;
    }
  };

  const toggleTask = async (id: string) => {
    setError(null);
    try {
      const updated = await todoService.toggleDone(id);
      setTasks((current) =>
        current.map((task) => (task.id === updated.id ? updated : task)),
      );
    } catch (toggleError) {
      setError(handleApiError(toggleError));
    }
  };

  const deleteTask = async (id: string) => {
    setError(null);
    try {
      await todoService.remove(id);
      setTasks((current) => current.filter((task) => task.id !== id));
    } catch (deleteError) {
      setError(handleApiError(deleteError));
    }
  };

  const onLogout = async () => {
    setPending(true);
    setError(null);
    try {
      await logout();
    } catch (logoutError) {
      setError(handleApiError(logoutError));
      setPending(false);
    }
  };

  const openLabel =
    openTasks.length === 1 ? "1 task open" : `${openTasks.length} tasks open`;

  return (
    <ListContainer direction="column">
      <ProfileMenu
        name={user?.name ?? "Your account"}
        email={user?.email ?? ""}
        pending={pending}
        onLogout={onLogout}
      />
      <ListCard variant="outlined">
        <div>
          <ListTitle component="h1" variant="h4">
            Today
          </ListTitle>
          <ListLede>{openLabel}</ListLede>
        </div>
        {error ? <FormAlert error={error} severity="error" /> : null}
        <ComposerInput
          placeholder="Search open and completed"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="search"
          slotProps={{
            htmlInput: { "aria-label": "Search open and completed" },
          }}
        />
        <TodoComposer onCreate={createTodo} />
        <TaskList>
          {open.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              divided={index < open.length - 1}
              onToggle={() => toggleTask(task.id)}
              onUpdate={updateTodo}
              onDelete={() => deleteTask(task.id)}
            />
          ))}
        </TaskList>
        <CompletedTasks
          tasks={done}
          open={showDone}
          searching={searching}
          onToggleOpen={() => setShowDone((current) => !current)}
          onUpdate={updateTodo}
          onToggleTask={toggleTask}
          onDelete={deleteTask}
        />
      </ListCard>
    </ListContainer>
  );
}
