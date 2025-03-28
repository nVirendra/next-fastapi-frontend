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
  { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
  { name: 'Recruitment', href: '/admin/recruitment', icon: Briefcase },
  { name: 'On-Boarding', href: '/admin/onboarding', icon: Users },
  {
    name: 'Employee',
    href: '#',
    icon: UserSquare,
    submenu: [
      { name: 'Employee List', href: '/admin/employees/list' },
      { name: 'Add Employee', href: '/admin/employees/add' },
      { name: 'Documents', href: '/admin/employees/documents' },
    ],
  },
  {
    name: 'Attendance',
    href: '#',
    icon: CalendarCheck,
    submenu: [
      { name: 'Daily Attendance', href: '/admin/attendance/daily' },
      { name: 'Leave Request', href: '/admin/attendance/leave-request' },
      { name: 'Leave Balance', href: '/admin/attendance/balance' },
    ],
  },
  { name: 'Payroll', href: '/admin/payroll', icon: CreditCard },
  { name: 'Travel', href: '/admin/travel', icon: Plane },
  { name: 'Reports', href: '/admin/reports', icon: BarChart },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];
