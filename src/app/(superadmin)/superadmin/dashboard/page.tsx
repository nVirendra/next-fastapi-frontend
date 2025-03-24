'use client';

import { useState } from 'react';
import {
  Home,
  Layers,
  Settings,
  BarChart,
  Database,
  ClipboardList,
  LayoutDashboard,
  Building,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const menu = [
  { label: 'Dashboard', icon: <Home size={18} />, path: '/dashboard' },
  { label: 'Masters', icon: <Database size={18} />, path: '/masters' },
  { label: 'Menus', icon: <ClipboardList size={18} />, path: '/menus' },
  { label: 'Modules', icon: <Layers size={18} />, path: '/modules' },
  { label: 'Reports', icon: <BarChart size={18} />, path: '/reports' },
  { label: 'Settings', icon: <Settings size={18} />, path: '/settings' },
];

const chartData = [
  { month: 'Jan', revenue: 40000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 75000 },
];

export default function SuperAdminDashboard() {
  const [dark, setDark] = useState(false);
  const toggleTheme = () => setDark(!dark);

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${
        dark
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-br from-slate-50 to-white text-gray-800'
      }`}
    >
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-xl p-6 hidden md:block border-r border-gray-200 dark:border-gray-700">
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold text-indigo-600 dark:text-white tracking-tight">
            FixHR Admin
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-300">
            Control Panel
          </p>
        </div>
        <nav className="space-y-3">
          {menu.map((item, i) => (
            <a
              key={i}
              href={item.path}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 transition"
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </nav>
        <button
          onClick={toggleTheme}
          className="mt-10 w-full bg-indigo-100 dark:bg-indigo-700 dark:text-white text-indigo-600 rounded-lg py-2 text-sm font-semibold"
        >
          Toggle {dark ? 'Light' : 'Dark'} Mode
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-8 py-8">
        <h1 className="text-4xl font-extrabold mb-8">
          Welcome Back, Super Admin 👋
        </h1>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {[
            {
              title: 'Total Businesses',
              value: '120',
              icon: (
                <Building className="text-indigo-500 dark:text-indigo-400 opacity-40 group-hover:opacity-70" />
              ),
            },
            {
              title: 'Active Modules',
              value: '8',
              icon: (
                <Layers className="text-green-500 dark:text-green-400 opacity-40 group-hover:opacity-70" />
              ),
            },
            {
              title: 'Revenue (This Month)',
              value: '₹1,25,000',
              icon: (
                <BarChart className="text-yellow-500 dark:text-yellow-400 opacity-40 group-hover:opacity-70" />
              ),
            },
            {
              title: 'Blocked Businesses',
              value: '4',
              icon: (
                <Settings className="text-red-500 dark:text-red-400 opacity-40 group-hover:opacity-70" />
              ),
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden group hover:shadow-lg transition duration-300"
            >
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 scale-150">
                {stat.icon}
              </div>
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                {stat.title}
              </h4>
              <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Revenue Chart + Recent Businesses */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 border border-gray-100 dark:border-gray-700 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4F46E5"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Latest Businesses</h3>
            <ul className="space-y-3">
              {['FixHR Tech', 'SmartPeople Co', 'BetaSoft', 'AI Systems'].map(
                (biz, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="font-medium">{biz}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                      Active
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Module-wise Revenue</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-separate border-spacing-y-2">
              <thead className="text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="py-2 px-3">Module</th>
                  <th className="py-2 px-3">Active Businesses</th>
                  <th className="py-2 px-3">Monthly Revenue</th>
                  <th className="py-2 px-3">Yearly Revenue</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-100">
                {[
                  {
                    name: 'Attendance',
                    active: 80,
                    monthly: 32000,
                    yearly: 384000,
                  },
                  {
                    name: 'Payroll',
                    active: 60,
                    monthly: 27000,
                    yearly: 324000,
                  },
                  {
                    name: 'Leave Mgmt',
                    active: 50,
                    monthly: 22000,
                    yearly: 264000,
                  },
                ].map((mod, i) => (
                  <tr
                    key={i}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm"
                  >
                    <td className="py-2 px-3 font-medium">{mod.name}</td>
                    <td className="py-2 px-3">{mod.active}</td>
                    <td className="py-2 px-3">
                      ₹{mod.monthly.toLocaleString()}
                    </td>
                    <td className="py-2 px-3">
                      ₹{mod.yearly.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
