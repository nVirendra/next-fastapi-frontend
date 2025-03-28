import { useEffect, useState } from 'react';
import { fetchEmployees } from '../api';
import { Employee } from '../types';

/**
 * useEmployeeList - A custom hook to fetch a list of employees using useEffect and useState.
 */
export const useEmployeeList = () => {
  const [data, setData] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const employees = await fetchEmployees();
        setData(employees);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch employees');
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return { data, isLoading, error };
};
