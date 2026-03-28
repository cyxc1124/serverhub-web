import request from '../utils/request';

export interface Server {
  id: number;
  name: string;
  host: string;
  port: number;
  description: string | null;
  status: string;
  owner_id: number;
  created_at: string;
  updated_at: string;
}

export interface ServerPayload {
  name: string;
  host: string;
  port?: number;
  description?: string;
}

export const getServers = () => request.get<Server[]>('/servers/');

export const getServer = (id: number) => request.get<Server>(`/servers/${id}`);

export const createServer = (data: ServerPayload) =>
  request.post<Server>('/servers/', data);

export const updateServer = (id: number, data: Partial<ServerPayload>) =>
  request.put<Server>(`/servers/${id}`, data);

export const deleteServer = (id: number) => request.delete(`/servers/${id}`);
