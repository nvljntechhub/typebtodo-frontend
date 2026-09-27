import api, { Method, type ApiResponse } from "@/utils/api-manager.utils";
import type { CreateTodoDto, Todo, UpdateTodoDto } from "./dto/todo.dto";
import { API_ENDPOINTS, todoDoneEndpoint, todoEndpoint } from "@/utils/api";

const todoService = {
  getAll: async () => {
    const response = await api<ApiResponse<Todo[]>>(
      Method.GET,
      null,
      API_ENDPOINTS.TODOS,
    );
    return response.data;
  },
  create: async (payload: CreateTodoDto) => {
    const response = await api<ApiResponse<Todo>>(
      Method.POST,
      null,
      API_ENDPOINTS.TODOS,
      payload,
    );
    return response.data;
  },
  update: async (id: string, payload: UpdateTodoDto) => {
    const response = await api<ApiResponse<Todo>>(
      Method.PUT,
      null,
      todoEndpoint(id),
      payload,
    );
    return response.data;
  },
  toggleDone: async (id: string) => {
    const response = await api<ApiResponse<Todo>>(
      Method.PATCH,
      null,
      todoDoneEndpoint(id),
    );
    return response.data;
  },
  remove: async (id: string) => {
    await api<ApiResponse>(Method.DELETE, null, todoEndpoint(id));
  },
};

export default todoService;
