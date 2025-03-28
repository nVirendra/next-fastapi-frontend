import { Employee } from '../types';

interface Props {
  data: Employee[];
}

export default function EmployeeTable({ data }: Props) {
  return (
    <div className="overflow-x-auto border rounded-md">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Department</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((emp) => (
            <tr key={emp.id} className="border-t hover:bg-gray-50">
              <td className="p-3 font-medium">{emp.name}</td>
              <td className="p-3">{emp.email}</td>
              <td className="p-3">{emp.role}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    emp.status === 'Active'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {emp.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
