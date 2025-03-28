'use client';

import {
  Home,
  Briefcase,
  Users,
  CalendarCheck,
  Settings,
  CreditCard,
  Plane,
  BarChart,
  UserSquare,
  LucideIcon,
} from 'lucide-react';

export interface AdminSidebarLink {
  name: string;
  href: string;
  icon: LucideIcon;
  submenu?: { name: string; href: string }[];
}

export const adminSidebarLinks: AdminSidebarLink[] = [
  { name: 'Dashboard', href: 'dashboard', icon: Home },
  { name: 'Recruitment', href: 'recruitment', icon: Briefcase },
  { name: 'On-Boarding', href: 'onboarding', icon: Users },
  {
    name: 'Employee',
    href: '#',
    icon: UserSquare,
    submenu: [
      { name: 'Employee List', href: 'employees/list' },
      { name: 'Add Employee', href: 'employees/add' },
      { name: 'Documents', href: 'employees/documents' },
    ],
  },
  {
    name: 'Attendance',
    href: '#',
    icon: CalendarCheck,
    submenu: [
      { name: 'Daily Attendance', href: 'attendance/daily' },
      { name: 'Leave Request', href: 'attendance/leave-request' },
      { name: 'Leave Balance', href: 'attendance/balance' },
    ],
  },
  {
    name: 'Payroll',
    href: 'payroll',
    icon: CreditCard,
    submenu: [
      { name: 'Employee Pay Composition', href: 'pay-composition' },
      { name: 'Salary Allowances', href: 'allowances' },
      { name: 'Statutory Deductions', href: 'statutory-deductions' },
      // {
      //   name: 'Bonus & Incentives',
      //   href: 'payroll/bonuses',
      // },
      // { name: 'Tax Management', href: 'payroll/tax' },
      {
        name: 'Payslip Generator',
        href: 'payslip',
      },
      {
        name: 'Payroll Processing',
        href: 'processing',
      },
      // {
      //   name: 'Bank Transfers',
      //   href: 'payroll/bank-transfers',
      // },
      {
        name: 'Payroll Reports',
        href: 'reports',
      },
    ],
  },
  { name: 'Travel', href: '/admin/travel', icon: Plane },
  { name: 'Reports', href: '/admin/reports', icon: BarChart },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];
