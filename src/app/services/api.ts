import axios from 'axios';
import { User } from '../types/user';

const API_URL = 'http://localhost:8000';

export const createUser = async (user: User) => {
  return await axios.post(`${API_URL}/users`, user);
};

export const getUsers = async () => {
  return await axios.get(`${API_URL}/users`);
};
