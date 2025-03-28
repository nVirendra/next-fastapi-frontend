import axios from '@/lib/axios';
import { Employee } from '../types';

export const fetchEmployees = async (): Promise<Employee[]> => {
  const res = await axios.get('/employees');
  return res.data;
};

export const createEmployee = async (payload: Omit<Employee, 'id'>) => {
  const res = await axios.post('/employees', payload);
  return res.data;
};

export const updateEmployee = async (
  id: string,
  payload: Partial<Employee>
) => {
  const res = await axios.put(`/employees/${id}`, payload);
  return res.data;
};

export const deleteEmployee = async (id: string) => {
  return axios.delete(`/employees/${id}`);
};
