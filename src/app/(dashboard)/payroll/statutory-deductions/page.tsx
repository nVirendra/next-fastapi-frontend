'use client';

import {
  Settings2,
  ShieldCheck,
  Landmark,
  ClipboardList,
  Save,
} from 'lucide-react';
import { useState } from 'react';

type StatutoryDeduction = {
  id: string;
  name: string;
  type: 'tax' | 'social_security' | 'retirement' | 'other';
  employeeRate: number;
  employerRate: number;
  threshold?: number;
  maxContribution?: number;
  isActive: boolean;
};

export default function StatutoryDeductionsPage() {
  const [deductions, setDeductions] = useState<StatutoryDeduction[]>([
    {
      id: '1',
      name: 'Provident Fund (PF)',
      type: 'retirement',
      employeeRate: 12,
      employerRate: 12,
      threshold: 15000,
      isActive: true,
    },
    {
      id: '2',
      name: 'Professional Tax',
      type: 'tax',
      employeeRate: 200,
      employerRate: 0,
      isActive: true,
    },
    {
      id: '3',
      name: 'ESI Contribution',
      type: 'social_security',
      employeeRate: 0.75,
      employerRate: 3.25,
      maxContribution: 21000,
      isActive: false,
    },
    {
      id: '4',
      name: 'Labour Welfare Fund',
      type: 'other',
      employeeRate: 10,
      employerRate: 20,
      isActive: true,
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedDeduction, setEditedDeduction] =
    useState<StatutoryDeduction | null>(null);

  const handleEdit = (id: string) => {
    const deductionToEdit = deductions.find((d) => d.id === id);
    if (deductionToEdit) {
      setEditingId(id);
      setEditedDeduction({ ...deductionToEdit });
    }
  };

  const handleSave = () => {
    if (editedDeduction) {
      setDeductions(
        deductions.map((d) => (d.id === editingId ? editedDeduction : d))
      );
      setEditingId(null);
      setEditedDeduction(null);
    }
  };

  const handleChange = (field: keyof StatutoryDeduction, value: any) => {
    if (editedDeduction) {
      setEditedDeduction({
        ...editedDeduction,
        [field]:
          field === 'employeeRate' || field === 'employerRate'
            ? parseFloat(value) || 0
            : value,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <ShieldCheck className="w-6 h-6 mr-2 text-blue-600" />
              Statutory Deductions Settings
            </h1>
            <p className="text-gray-600">
              Configure mandatory payroll deductions as per government
              regulations
            </p>
          </div>
          <button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
            <Settings2 className="w-4 h-4 mr-2" />
            Advanced Settings
          </button>
        </div>

        {/* Deductions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Configured Deductions
              </h2>
              <span className="text-sm text-gray-500">
                {deductions.length} statutory components
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-3">Deduction</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3 text-right">Employee Rate</th>
                    <th className="px-6 py-3 text-right">Employer Rate</th>
                    <th className="px-6 py-3">Threshold</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {deductions.map((deduction) => (
                    <tr key={deduction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {deduction.name}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            deduction.type === 'tax'
                              ? 'bg-red-100 text-red-800'
                              : deduction.type === 'social_security'
                              ? 'bg-blue-100 text-blue-800'
                              : deduction.type === 'retirement'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {deduction.type
                            .replace('_', ' ')
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium">
                        {editingId === deduction.id ? (
                          <input
                            type="number"
                            value={editedDeduction?.employeeRate}
                            onChange={(e) =>
                              handleChange('employeeRate', e.target.value)
                            }
                            className="w-20 px-2 py-1 border border-gray-300 rounded"
                          />
                        ) : (
                          `${deduction.employeeRate}${
                            deduction.employeeRate > 1 ? '%' : ''
                          }`
                        )}
                      </td>
                      <td className="px-6 py-4 text-right font-medium">
                        {editingId === deduction.id ? (
                          <input
                            type="number"
                            value={editedDeduction?.employerRate}
                            onChange={(e) =>
                              handleChange('employerRate', e.target.value)
                            }
                            className="w-20 px-2 py-1 border border-gray-300 rounded"
                          />
                        ) : (
                          `${deduction.employerRate}${
                            deduction.employerRate > 1 ? '%' : ''
                          }`
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {deduction.threshold ? (
                          editingId === deduction.id ? (
                            <input
                              type="number"
                              value={editedDeduction?.threshold}
                              onChange={(e) =>
                                handleChange('threshold', e.target.value)
                              }
                              className="w-24 px-2 py-1 border border-gray-300 rounded"
                            />
                          ) : (
                            `₹${deduction.threshold.toLocaleString()}`
                          )
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingId === deduction.id ? (
                          <select
                            value={
                              editedDeduction?.isActive ? 'active' : 'inactive'
                            }
                            onChange={(e) =>
                              handleChange(
                                'isActive',
                                e.target.value === 'active'
                              )
                            }
                            className="px-2 py-1 border border-gray-300 rounded"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        ) : (
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              deduction.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {deduction.isActive ? 'Active' : 'Inactive'}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {editingId === deduction.id ? (
                          <button
                            onClick={handleSave}
                            className="text-green-600 hover:text-green-800 p-1.5 rounded-md hover:bg-green-50 transition-colors"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEdit(deduction.id)}
                            className="text-blue-600 hover:text-blue-800 p-1.5 rounded-md hover:bg-blue-50 transition-colors"
                          >
                            <ClipboardList className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-lg font-medium text-blue-800 flex items-center mb-3">
            <Landmark className="w-5 h-5 mr-2" />
            Statutory Compliance Guidelines
          </h3>
          <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
            <li>
              Ensure rates are updated according to current financial year
              regulations
            </li>
            <li>Professional tax rates vary by state - verify local laws</li>
            <li>PF threshold amount is ₹15,000 as per EPFO guidelines</li>
            <li>ESI applies to employees earning ≤ ₹21,000 per month</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
