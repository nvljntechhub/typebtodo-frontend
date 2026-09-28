export type RegisterDto = {
  name: string;
  email: string;
  password: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};
