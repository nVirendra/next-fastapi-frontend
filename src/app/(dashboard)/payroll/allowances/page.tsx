'use client';

import { useState } from 'react';
import { Edit2, Trash2, Plus, X, Check } from 'lucide-react';

export default function SalaryAllowancePage() {
  const [form, setForm] = useState({
    earningType: '',
    payrollHeading: '',
    earningName: '',
    earningDescription: '',
    calculationType: '',
    calculationValue: '',
    status: false,
    showPayslip: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Salary Allowance:', form);
    // TODO: Send to API or DB
  };

  const allowances = [
    {
      id: 1,
      name: 'Medical Allowance',
      type: 'Fixed',
      desc: 'Health benefit',
      value: '₹1,250',
      status: 'Active',
      payslip: 'Yes',
    },
    {
      id: 2,
      name: 'DA',
      type: 'Fixed',
      desc: 'Cost of living',
      value: '₹2,000',
      status: 'Active',
      payslip: 'Yes',
    },
    {
      id: 3,
      name: 'House Rent Allowance',
      type: 'Fixed',
      desc: 'Housing',
      value: '₹5,000',
      status: 'Inactive',
      payslip: 'No',
    },
    {
      id: 4,
      name: 'Conveyance Allowance',
      type: 'Fixed',
      desc: 'Transport',
      value: '₹800',
      status: 'Active',
      payslip: 'Yes',
    },
    {
      id: 5,
      name: 'Dearness Allowance',
      type: 'Fixed',
      desc: 'Inflation',
      value: '₹3,000',
      status: 'Active',
      payslip: 'Yes',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side: Salary Allowance List (takes 2/3 width on large screens) */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Allowance List
                </h2>
                <div className="flex items-center mt-2 sm:mt-0">
                  <span className="text-sm text-gray-500 mr-3">
                    Total: {allowances.length} items
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-max">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Earning</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Value</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Payslip</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {allowances.map((item, idx) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {idx + 1}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.desc}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {item.type}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {item.value}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              item.status === 'Active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              item.payslip === 'Yes'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {item.payslip}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end space-x-2">
                            <button className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors">
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Side: Add Salary Allowance Form (takes 1/3 width on large screens) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                Add Allowance
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Earning Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="earningType"
                    value={form.earningType}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="">Select Earning Type</option>
                    <option value="fixed">Fixed</option>
                    <option value="variable">Variable</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payroll Heading <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="payrollHeading"
                    value={form.payrollHeading}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="">Select Payroll Heading</option>
                    <option value="basic">Basic</option>
                    <option value="hra">HRA</option>
                    <option value="da">DA</option>
                    <option value="medical">Medical</option>
                    <option value="conveyance">Conveyance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Earning Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="earningName"
                    value={form.earningName}
                    onChange={handleChange}
                    required
                    placeholder="Earning Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Earning Description
                  </label>
                  <input
                    type="text"
                    name="earningDescription"
                    value={form.earningDescription}
                    onChange={handleChange}
                    placeholder="Earning Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calculation Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="calculationType"
                    value={form.calculationType}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="">Select Type</option>
                    <option value="percentage">Percentage</option>
                    <option value="amount">Amount</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Value (% or Amount) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="calculationValue"
                    value={form.calculationValue}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <label className="text-sm font-medium text-gray-700">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      name="status"
                      id="status"
                      checked={form.status}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <label
                      htmlFor="status"
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                        form.status ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full bg-white shadow-md transform transition-transform ${
                          form.status ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">
                    {form.status ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <label className="text-sm font-medium text-gray-700">
                    Show on Payslip <span className="text-red-500">*</span>
                  </label>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      name="showPayslip"
                      id="showPayslip"
                      checked={form.showPayslip}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <label
                      htmlFor="showPayslip"
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                        form.showPayslip ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full bg-white shadow-md transform transition-transform ${
                          form.showPayslip ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">
                    {form.showPayslip ? 'Yes' : 'No'}
                  </span>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        earningType: '',
                        payrollHeading: '',
                        earningName: '',
                        earningDescription: '',
                        calculationType: '',
                        calculationValue: '',
                        status: false,
                        showPayslip: false,
                      })
                    }
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <X className="mr-1 h-4 w-4" /> Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Check className="mr-1 h-4 w-4" /> Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
