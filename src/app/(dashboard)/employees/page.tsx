'use client';

import { useEmployeeList } from '@/app/features/employee/hooks/useEmployeeList';
import EmployeeTable from '@/app/features/employee/components/EmployeeTable';

export default function EmployeePage() {
  const { data = [], isLoading } = useEmployeeList();

  if (isLoading) return <div className="p-4">Loading employees...</div>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Employee List</h1>
      <EmployeeTable data={data} />
    </div>
  );
}
