import axios from 'axios';
import { User, UserCreate } from '@/app/types/user';

const API_BASE = 'http://localhost:8000/api/v1'; // change if deployed

export const fetchUsers = async (
  search = '',
  skip = 0,
  limit = 10
): Promise<User[]> => {
  const res = await axios.get(`${API_BASE}/users`, {
    params: { search, skip, limit },
  });
  return res.data;
};

export const createUser = async (user: UserCreate): Promise<User> => {
  const res = await axios.post(`${API_BASE}/users`, user);
  return res.data;
};

export const updateUser = async (
  id: string,
  user: UserCreate
): Promise<User> => {
  const res = await axios.put(`${API_BASE}/users/${id}`, user);
  return res.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE}/users/${id}`);
};
