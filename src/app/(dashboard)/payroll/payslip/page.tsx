'use client';

import {
  Download,
  Printer,
  Mail,
  FileSearch,
  Calendar,
  User,
  Building,
  Banknote,
} from 'lucide-react';
import { useState } from 'react';

export default function PayslipGenerator() {
  const [employeeId, setEmployeeId] = useState('');
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [payslipData, setPayslipData] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample employee data
  const employees = [
    {
      id: 'EMP001',
      name: 'Rahul Sharma',
      department: 'Engineering',
      position: 'Senior Developer',
    },
    {
      id: 'EMP002',
      name: 'Priya Patel',
      department: 'HR',
      position: 'HR Manager',
    },
    {
      id: 'EMP003',
      name: 'Amit Singh',
      department: 'Finance',
      position: 'Accountant',
    },
  ];

  // Sample payslip data structure
  const generatePayslip = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setPayslipData({
        employee: employees.find((emp) => emp.id === employeeId),
        month,
        basicSalary: 45000,
        hra: 18000,
        da: 4500,
        specialAllowance: 7500,
        professionalTax: 200,
        pfDeduction: 5400,
        incomeTax: 3750,
        netPay: 65650,
        bankDetails: {
          accountNumber: 'XXXXXX7890',
          bankName: 'HDFC Bank',
          ifsc: 'HDFC0000123',
        },
        leavesTaken: 1,
        workingDays: 22,
      });
      setIsGenerating(false);
    }, 1000);
  };

  const handleDownload = (format: 'pdf' | 'html') => {
    alert(`Downloading payslip in ${format.toUpperCase()} format`);
    // Actual implementation would generate the file
  };

  const handleSendEmail = () => {
    alert(`Payslip sent to ${payslipData.employee.name}'s registered email`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <Banknote className="w-6 h-6 mr-2 text-blue-600" />
              Payslip Generator
            </h1>
            <p className="text-gray-600">
              Generate and manage employee payslips
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              Current Month:{' '}
              {new Date().toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Generator Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <User className="w-4 h-4 mr-1" /> Employee
              </label>
              <select
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Calendar className="w-4 h-4 mr-1" /> Month
              </label>
              <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={generatePayslip}
                disabled={!employeeId || isGenerating}
                className={`w-full px-4 py-2 rounded-lg flex items-center justify-center ${
                  !employeeId || isGenerating
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isGenerating ? (
                  'Generating...'
                ) : (
                  <>
                    <FileSearch className="w-4 h-4 mr-2" />
                    Generate Payslip
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Payslip Preview */}
        {payslipData && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Payslip Header */}
            <div className="bg-blue-600 text-white p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h2 className="text-xl font-bold">SALARY PAYSLIP</h2>
                  <p className="text-blue-100">
                    {new Date(`${payslipData.month}-01`).toLocaleString(
                      'default',
                      { month: 'long', year: 'numeric' }
                    )}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <p className="font-medium">
                    Payslip #PS{payslipData.month.replace('-', '')}-{employeeId}
                  </p>
                  <p className="text-blue-100 text-sm">
                    Generated on {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Employee Details */}
            <div className="p-6 border-b">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    EMPLOYEE DETAILS
                  </h3>
                  <p className="font-medium">{payslipData.employee.name}</p>
                  <p className="text-gray-600 text-sm">
                    {payslipData.employee.position}
                  </p>
                  <p className="text-gray-600 text-sm">
                    ID: {payslipData.employee.id}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    DEPARTMENT
                  </h3>
                  <p className="font-medium">
                    {payslipData.employee.department}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Working Days: {payslipData.workingDays} | Leaves:{' '}
                    {payslipData.leavesTaken}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    BANK DETAILS
                  </h3>
                  <p className="font-medium">
                    {payslipData.bankDetails.bankName}
                  </p>
                  <p className="text-gray-600 text-sm">
                    A/C: {payslipData.bankDetails.accountNumber}
                  </p>
                  <p className="text-gray-600 text-sm">
                    IFSC: {payslipData.bankDetails.ifsc}
                  </p>
                </div>
              </div>
            </div>

            {/* Earnings and Deductions */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Banknote className="w-5 h-5 mr-2 text-green-600" />
                  Earnings
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Basic Salary</span>
                    <span className="font-medium">
                      ₹{payslipData.basicSalary.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>House Rent Allowance (HRA)</span>
                    <span className="font-medium">
                      ₹{payslipData.hra.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dearness Allowance (DA)</span>
                    <span className="font-medium">
                      ₹{payslipData.da.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Special Allowance</span>
                    <span className="font-medium">
                      ₹{payslipData.specialAllowance.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2 font-bold flex justify-between">
                    <span>Total Earnings</span>
                    <span>
                      ₹
                      {(
                        payslipData.basicSalary +
                        payslipData.hra +
                        payslipData.da +
                        payslipData.specialAllowance
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Building className="w-5 h-5 mr-2 text-red-600" />
                  Deductions
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Provident Fund (PF)</span>
                    <span className="font-medium text-red-600">
                      -₹{payslipData.pfDeduction.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Professional Tax</span>
                    <span className="font-medium text-red-600">
                      -₹{payslipData.professionalTax.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Income Tax (TDS)</span>
                    <span className="font-medium text-red-600">
                      -₹{payslipData.incomeTax.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2 font-bold flex justify-between">
                    <span>Total Deductions</span>
                    <span className="text-red-600">
                      -₹
                      {(
                        payslipData.pfDeduction +
                        payslipData.professionalTax +
                        payslipData.incomeTax
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Pay */}
            <div className="bg-gray-50 p-6 border-t">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    NET PAYABLE
                  </h3>
                  <p className="text-xs text-gray-500">
                    Amount will be credited to your bank account
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    ₹{payslipData.netPay.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {payslipData.netPayInWords ||
                      'Rupees Sixty Five Thousand Six Hundred Fifty Only'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 bg-gray-50 border-t flex justify-end space-x-3">
              <button
                onClick={() => handleDownload('pdf')}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                PDF
              </button>
              <button
                onClick={() => handleDownload('html')}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </button>
              <button
                onClick={handleSendEmail}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </button>
            </div>
          </div>
        )}

        {/* Help Section */}
        {!payslipData && (
          <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-lg font-medium text-blue-800 flex items-center mb-3">
              <FileSearch className="w-5 h-5 mr-2" />
              How to Generate Payslips
            </h3>
            <ol className="list-decimal pl-5 text-sm text-blue-700 space-y-2">
              <li>Select an employee from the dropdown</li>
              <li>Choose the month for the payslip</li>
              <li>Click "Generate Payslip" button</li>
              <li>Download, print, or email the generated payslip</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
