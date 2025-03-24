// features/employee/api/importExport.ts
import axios from '@/lib/axios';

export const importEmployeesFromFile = async (formData: FormData) => {
  const res = await axios.post('/api/v1/employees/import', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const exportEmployeesToExcel = async (): Promise<Blob> => {
  const res = await axios.get('/api/v1/employees/export', {
    responseType: 'blob',
  });
  return res.data;
};
