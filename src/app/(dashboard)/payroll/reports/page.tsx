'use client';

import {
  FileText,
  PieChart,
  BarChart2,
  Download,
  Filter,
  Calendar,
  User,
  IndianRupee,
  Banknote,
  Clock,
} from 'lucide-react';
import { useState } from 'react';

type ReportType = 'summary' | 'tax' | 'department' | 'employee' | 'custom';
type ReportPeriod = 'monthly' | 'quarterly' | 'yearly' | 'custom';

interface ReportData {
  id: string;
  title: string;
  type: ReportType;
  period: string;
  generatedOn: string;
  downloadCount: number;
}

export default function PayrollReportsPage() {
  const [activeReport, setActiveReport] = useState<ReportType>('summary');
  const [period, setPeriod] = useState<ReportPeriod>('monthly');
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split('T')[0],
    end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
      .toISOString()
      .split('T')[0],
  });
  const [department, setDepartment] = useState<string>('all');
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample report data
  const reports: ReportData[] = [
    {
      id: '1',
      title: 'Monthly Payroll Summary - Nov 2023',
      type: 'summary',
      period: '2023-11',
      generatedOn: '2023-11-30',
      downloadCount: 4,
    },
    {
      id: '2',
      title: 'Tax Deductions - Q3 2023',
      type: 'tax',
      period: '2023-Q3',
      generatedOn: '2023-10-05',
      downloadCount: 2,
    },
    {
      id: '3',
      title: 'Engineering Department - Oct 2023',
      type: 'department',
      period: '2023-10',
      generatedOn: '2023-10-31',
      downloadCount: 3,
    },
    {
      id: '4',
      title: 'Year-End Tax Report - 2023',
      type: 'tax',
      period: '2023',
      generatedOn: '2023-12-15',
      downloadCount: 5,
    },
  ];

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'hr', name: 'Human Resources' },
    { id: 'finance', name: 'Finance' },
    { id: 'marketing', name: 'Marketing' },
  ];

  const generateReport = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Generated ${activeReport} report for ${period} period`);
    }, 2000);
  };

  const downloadReport = (id: string) => {
    alert(`Downloading report ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <FileText className="w-6 h-6 mr-2 text-blue-600" />
              Payroll Reports
            </h1>
            <p className="text-gray-600">
              Generate and analyze payroll reports
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

        {/* Report Selection and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Report Type Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FileText className="w-4 h-4 mr-1" /> Report Type
              </label>
              <select
                value={activeReport}
                onChange={(e) => setActiveReport(e.target.value as ReportType)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="summary">Payroll Summary</option>
                <option value="tax">Tax Deductions</option>
                <option value="department">Department-wise</option>
                <option value="employee">Employee-wise</option>
                <option value="custom">Custom Report</option>
              </select>
            </div>

            {/* Period Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Calendar className="w-4 h-4 mr-1" /> Period
              </label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value as ReportPeriod)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
                <option value="custom">Custom Date Range</option>
              </select>
            </div>

            {/* Department Filter */}
            {activeReport === 'department' || activeReport === 'employee' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <User className="w-4 h-4 mr-1" /> Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Filter className="w-4 h-4 mr-1" /> Filters
                </label>
                <button className="w-full px-3 py-2 border border-gray-300 rounded-lg text-left text-gray-500 hover:bg-gray-50">
                  Add Filters
                </button>
              </div>
            )}

            {/* Generate Button */}
            <div className="flex items-end">
              <button
                onClick={generateReport}
                disabled={isGenerating}
                className={`w-full px-4 py-2 rounded-lg flex items-center justify-center ${
                  isGenerating
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <PieChart className="w-4 h-4 mr-2" />
                    Generate Report
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Date Range Picker (shown when custom period selected) */}
          {period === 'custom' && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, start: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, end: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          )}
        </div>

        {/* Report Preview Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              {activeReport === 'summary' && (
                <PieChart className="w-5 h-5 mr-2 text-blue-600" />
              )}
              {activeReport === 'tax' && (
                <Banknote className="w-5 h-5 mr-2 text-blue-600" />
              )}
              {activeReport === 'department' && (
                <User className="w-5 h-5 mr-2 text-blue-600" />
              )}
              {activeReport === 'employee' && (
                <User className="w-5 h-5 mr-2 text-blue-600" />
              )}
              {activeReport === 'custom' && (
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
              )}
              {activeReport === 'summary' && 'Payroll Summary'}
              {activeReport === 'tax' && 'Tax Deductions'}
              {activeReport === 'department' && 'Department Report'}
              {activeReport === 'employee' && 'Employee Report'}
              {activeReport === 'custom' && 'Custom Report'}
            </h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm flex items-center hover:bg-gray-50">
                <Download className="w-4 h-4 mr-1" />
                Export
              </button>
            </div>
          </div>

          {/* Placeholder for actual report content */}
          <div className="bg-gray-50 rounded-lg p-8 flex flex-col items-center justify-center text-center">
            {activeReport === 'summary' && (
              <>
                <PieChart className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">
                  Payroll Summary
                </h3>
                <p className="text-gray-400 max-w-md">
                  Overview of total payroll costs, department-wise breakdown,
                  and key metrics for the selected period.
                </p>
              </>
            )}
            {activeReport === 'tax' && (
              <>
                <Banknote className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">
                  Tax Deductions Report
                </h3>
                <p className="text-gray-400 max-w-md">
                  Detailed breakdown of all tax deductions including TDS,
                  professional tax, and other statutory deductions.
                </p>
              </>
            )}
            {activeReport === 'department' && (
              <>
                <User className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">
                  Department Report
                </h3>
                <p className="text-gray-400 max-w-md">
                  Department-wise payroll analysis showing salary distribution,
                  headcount, and cost centers.
                </p>
              </>
            )}
            {activeReport === 'employee' && (
              <>
                <User className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">
                  Employee Report
                </h3>
                <p className="text-gray-400 max-w-md">
                  Individual employee payroll details including earnings,
                  deductions, and net pay.
                </p>
              </>
            )}
            {activeReport === 'custom' && (
              <>
                <FileText className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">
                  Custom Report
                </h3>
                <p className="text-gray-400 max-w-md">
                  Create a customized payroll report with specific fields and
                  filters as per your requirements.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recently Generated Reports
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3">Report Title</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Period</th>
                  <th className="px-6 py-3">Generated On</th>
                  <th className="px-6 py-3">Downloads</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 font-medium">{report.title}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {report.type.charAt(0).toUpperCase() +
                          report.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{report.period}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(report.generatedOn).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center">
                        <Download className="w-3 h-3 mr-1 text-gray-400" />
                        {report.downloadCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => downloadReport(report.id)}
                        className="text-blue-600 hover:text-blue-800 p-1.5 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
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
