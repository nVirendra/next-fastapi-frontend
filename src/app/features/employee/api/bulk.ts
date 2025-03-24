// features/employee/api/bulk.ts
import axios from '@/lib/axios';
import { Employee } from '../types';

export const bulkUpdateEmployees = async (employees: Employee[]) => {
  const res = await axios.put('/api/v1/employees/bulk', employees);
  return res.data;
};
