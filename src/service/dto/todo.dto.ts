export type Todo = {
  id: string;
  title: string;
  description: string | null;
  done: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateTodoDto = {
  title: string;
  description?: string;
};

export type UpdateTodoDto = {
  title?: string;
  description?: string | null;
};
