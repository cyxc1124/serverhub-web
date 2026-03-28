import request from '../utils/request';

export interface User {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at: string;
}

export const getCurrentUser = () => request.get<User>('/users/me');

export const getUsers = () => request.get<User[]>('/users/');

export const deleteUser = (id: number) => request.delete(`/users/${id}`);
