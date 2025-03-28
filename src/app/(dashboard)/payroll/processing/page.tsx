'use client';

import {
  Calculator,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Send,
  Calendar,
  Users,
  Banknote,
  IndianRupee,
} from 'lucide-react';
import { useState } from 'react';

type PayrollPeriod = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  employees: number;
  totalAmount: number;
};

export default function PayrollProcessingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Sample payroll periods
  const payrollPeriods: PayrollPeriod[] = [
    {
      id: '2023-11',
      name: 'November 2023',
      startDate: '2023-11-01',
      endDate: '2023-11-30',
      status: 'completed',
      employees: 42,
      totalAmount: 2850000,
    },
    {
      id: '2023-12',
      name: 'December 2023',
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      status: 'processing',
      employees: 45,
      totalAmount: 3025000,
    },
    {
      id: '2024-01',
      name: 'January 2024',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      status: 'pending',
      employees: 48,
      totalAmount: 0,
    },
  ];

  const processPayroll = () => {
    setIsProcessing(true);
    setCurrentStep(1);

    // Simulate processing steps
    const steps = [
      'Validating employee data',
      'Calculating salaries',
      'Processing deductions',
      'Generating payslips',
      'Creating bank transfer file',
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index + 2);
        if (index === steps.length - 1) {
          setIsProcessing(false);
        }
      }, (index + 1) * 1500);
    });
  };

  const downloadPayslips = () => {
    alert('Downloading all payslips for the selected period');
  };

  const sendBankInstructions = () => {
    alert('Sending bank transfer instructions');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-blue-500 animate-pulse" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <IndianRupee className="w-6 h-6 mr-2 text-blue-600" />
              Payroll Processing
            </h1>
            <p className="text-gray-600">
              Run and manage monthly payroll cycles
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date().toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Payroll Period Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            Select Payroll Period
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {payrollPeriods.map((period) => (
              <div
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedPeriod === period.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{period.name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(period.startDate).toLocaleDateString()} -{' '}
                      {new Date(period.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  {getStatusIcon(period.status)}
                </div>
                <div className="mt-3 flex justify-between text-sm">
                  <span className="flex items-center text-gray-500">
                    <Users className="w-3 h-3 mr-1" />
                    {period.employees} employees
                  </span>
                  {period.totalAmount > 0 && (
                    <span className="flex items-center font-medium">
                      <Banknote className="w-3 h-3 mr-1" />₹
                      {period.totalAmount.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {selectedPeriod && (
            <div className="border-t pt-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <h3 className="font-medium">
                    {payrollPeriods.find((p) => p.id === selectedPeriod)?.name}{' '}
                    Payroll
                  </h3>
                  <p className="text-sm text-gray-500">
                    {payrollPeriods.find((p) => p.id === selectedPeriod)
                      ?.status === 'completed'
                      ? 'Processed on ' + new Date().toLocaleDateString()
                      : 'Ready for processing'}
                  </p>
                </div>
                <div className="mt-3 sm:mt-0 flex space-x-3">
                  <button
                    onClick={downloadPayslips}
                    disabled={
                      payrollPeriods.find((p) => p.id === selectedPeriod)
                        ?.status !== 'completed'
                    }
                    className={`px-4 py-2 rounded-lg flex items-center ${
                      payrollPeriods.find((p) => p.id === selectedPeriod)
                        ?.status !== 'completed'
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                  <button
                    onClick={sendBankInstructions}
                    disabled={
                      payrollPeriods.find((p) => p.id === selectedPeriod)
                        ?.status !== 'completed'
                    }
                    className={`px-4 py-2 rounded-lg flex items-center ${
                      payrollPeriods.find((p) => p.id === selectedPeriod)
                        ?.status !== 'completed'
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send to Bank
                  </button>
                  <button
                    onClick={processPayroll}
                    disabled={
                      isProcessing ||
                      payrollPeriods.find((p) => p.id === selectedPeriod)
                        ?.status === 'completed' ||
                      payrollPeriods.find((p) => p.id === selectedPeriod)
                        ?.status === 'processing'
                    }
                    className={`px-4 py-2 rounded-lg flex items-center ${
                      isProcessing ||
                      payrollPeriods.find((p) => p.id === selectedPeriod)
                        ?.status === 'completed' ||
                      payrollPeriods.find((p) => p.id === selectedPeriod)
                        ?.status === 'processing'
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    {isProcessing ? 'Processing...' : 'Run Payroll'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Processing Status */}
        {isProcessing && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600 animate-pulse" />
              Payroll Processing
            </h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 mt-1 ${
                    currentStep > 1
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {currentStep > 1 ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-medium">1</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-medium ${
                      currentStep > 1
                        ? 'text-green-600'
                        : currentStep === 1
                        ? 'text-blue-600'
                        : 'text-gray-600'
                    }`}
                  >
                    Validating employee data
                  </h3>
                  {currentStep === 1 && (
                    <p className="text-sm text-gray-500">
                      Checking attendance and leave records...
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 mt-1 ${
                    currentStep > 2
                      ? 'bg-green-100 text-green-600'
                      : currentStep === 2
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {currentStep > 2 ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-medium">2</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-medium ${
                      currentStep > 2
                        ? 'text-green-600'
                        : currentStep === 2
                        ? 'text-blue-600'
                        : 'text-gray-600'
                    }`}
                  >
                    Calculating salaries
                  </h3>
                  {currentStep === 2 && (
                    <p className="text-sm text-gray-500">
                      Processing basic pay, allowances, and bonuses...
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 mt-1 ${
                    currentStep > 3
                      ? 'bg-green-100 text-green-600'
                      : currentStep === 3
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {currentStep > 3 ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-medium">3</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-medium ${
                      currentStep > 3
                        ? 'text-green-600'
                        : currentStep === 3
                        ? 'text-blue-600'
                        : 'text-gray-600'
                    }`}
                  >
                    Processing deductions
                  </h3>
                  {currentStep === 3 && (
                    <p className="text-sm text-gray-500">
                      Calculating PF, TDS, and other deductions...
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 mt-1 ${
                    currentStep > 4
                      ? 'bg-green-100 text-green-600'
                      : currentStep === 4
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {currentStep > 4 ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-medium">4</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-medium ${
                      currentStep > 4
                        ? 'text-green-600'
                        : currentStep === 4
                        ? 'text-blue-600'
                        : 'text-gray-600'
                    }`}
                  >
                    Generating payslips
                  </h3>
                  {currentStep === 4 && (
                    <p className="text-sm text-gray-500">
                      Creating individual employee payslips...
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 mt-1 ${
                    currentStep > 5
                      ? 'bg-green-100 text-green-600'
                      : currentStep === 5
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {currentStep > 5 ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-medium">5</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-medium ${
                      currentStep > 5
                        ? 'text-green-600'
                        : currentStep === 5
                        ? 'text-blue-600'
                        : 'text-gray-600'
                    }`}
                  >
                    Creating bank transfer file
                  </h3>
                  {currentStep === 5 && (
                    <p className="text-sm text-gray-500">
                      Preparing bulk payment instructions...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Payroll Activity
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3">Period</th>
                  <th className="px-6 py-3">Processed On</th>
                  <th className="px-6 py-3">Employees</th>
                  <th className="px-6 py-3 text-right">Total Amount</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payrollPeriods
                  .filter((p) => p.status === 'completed')
                  .map((period) => (
                    <tr key={period.id}>
                      <td className="px-6 py-4 font-medium">{period.name}</td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(period.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">{period.employees}</td>
                      <td className="px-6 py-4 text-right font-medium">
                        ₹{period.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center w-fit">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
