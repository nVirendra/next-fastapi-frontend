'use client';

import { Banknote, PieChart, Calculator, Wallet, Receipt } from 'lucide-react';
import { useState } from 'react';

type PayComponent = {
  id: string;
  name: string;
  type: 'fixed' | 'variable' | 'benefit' | 'deduction';
  amount: number;
  taxable: boolean;
  description: string;
};

export default function PayCompositionPage() {
  const [activeTab, setActiveTab] = useState<
    'breakdown' | 'calculator' | 'comparison'
  >('breakdown');

  // Sample pay composition data
  const [payComponents, setPayComponents] = useState<PayComponent[]>([
    {
      id: '1',
      name: 'Basic Salary',
      type: 'fixed',
      amount: 30000,
      taxable: true,
      description: 'Core salary component',
    },
    {
      id: '2',
      name: 'HRA',
      type: 'fixed',
      amount: 12000,
      taxable: false,
      description: 'House Rent Allowance',
    },
    {
      id: '3',
      name: 'Performance Bonus',
      type: 'variable',
      amount: 5000,
      taxable: true,
      description: 'Q2 Performance Bonus',
    },
    {
      id: '4',
      name: 'PF Contribution',
      type: 'deduction',
      amount: -3600,
      taxable: false,
      description: 'Employee Provident Fund',
    },
  ]);

  const totalEarnings = payComponents
    .filter((c) => c.type !== 'deduction')
    .reduce((sum, comp) => sum + comp.amount, 0);

  const totalDeductions = payComponents
    .filter((c) => c.type === 'deduction')
    .reduce((sum, comp) => sum + Math.abs(comp.amount), 0);

  const netPay = totalEarnings - totalDeductions;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Pay Composition
            </h1>
            <p className="text-gray-600">
              Detailed breakdown of your compensation structure
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              Current Month:{' '}
              {new Date().toLocaleString('default', { month: 'long' })}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'breakdown'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('breakdown')}
          >
            <div className="flex items-center">
              <PieChart className="w-4 h-4 mr-2" />
              Pay Breakdown
            </div>
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'calculator'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('calculator')}
          >
            <div className="flex items-center">
              <Calculator className="w-4 h-4 mr-2" />
              Take-Home Calculator
            </div>
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'comparison'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('comparison')}
          >
            <div className="flex items-center">
              <Wallet className="w-4 h-4 mr-2" />
              Year Comparison
            </div>
          </button>
        </div>

        {/* Main Content */}
        {activeTab === 'breakdown' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border-b">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-green-700">
                      Total Earnings
                    </p>
                    <p className="text-2xl font-bold text-green-800">
                      ₹{totalEarnings.toLocaleString()}
                    </p>
                  </div>
                  <Banknote className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-red-700">
                      Total Deductions
                    </p>
                    <p className="text-2xl font-bold text-red-800">
                      ₹{totalDeductions.toLocaleString()}
                    </p>
                  </div>
                  <Receipt className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-blue-700">Net Pay</p>
                    <p className="text-2xl font-bold text-blue-800">
                      ₹{netPay.toLocaleString()}
                    </p>
                  </div>
                  <Wallet className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Pay Components
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3">Component</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3 text-right">Amount</th>
                      <th className="px-6 py-3">Taxable</th>
                      <th className="px-6 py-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {payComponents.map((component) => (
                      <tr key={component.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {component.name}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              component.type === 'fixed'
                                ? 'bg-purple-100 text-purple-800'
                                : component.type === 'variable'
                                ? 'bg-yellow-100 text-yellow-800'
                                : component.type === 'benefit'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {component.type.charAt(0).toUpperCase() +
                              component.type.slice(1)}
                          </span>
                        </td>
                        <td
                          className={`px-6 py-4 text-right font-medium ${
                            component.type === 'deduction'
                              ? 'text-red-600'
                              : 'text-gray-900'
                          }`}
                        >
                          {component.type === 'deduction' ? '-' : ''}₹
                          {Math.abs(component.amount).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          {component.taxable ? (
                            <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                              Taxable
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Exempt
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {component.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Take-Home Pay Calculator
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-3">
                  Adjust Components
                </h3>
                {/* Calculator form would go here */}
                <div className="space-y-4">
                  {payComponents.map((component) => (
                    <div
                      key={component.id}
                      className="flex items-center justify-between"
                    >
                      <label className="text-sm font-medium text-gray-700">
                        {component.name}
                      </label>
                      <input
                        type="number"
                        value={component.amount}
                        onChange={(e) => {
                          const newComponents = [...payComponents];
                          const index = newComponents.findIndex(
                            (c) => c.id === component.id
                          );
                          newComponents[index].amount = Number(e.target.value);
                          setPayComponents(newComponents);
                        }}
                        className="w-32 px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-3">
                  Calculation Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Earnings:</span>
                    <span className="font-medium">
                      ₹{totalEarnings.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Deductions:</span>
                    <span className="font-medium text-red-600">
                      -₹{totalDeductions.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Net Take-Home Pay:</span>
                    <span className="text-blue-600">
                      ₹{netPay.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Yearly Comparison
            </h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">
                Comparison chart would be displayed here
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
