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
} from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { SidebarItemWithSubmenu } from './SidebarItemWithSubmenu';
import { useState } from 'react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeMenu: string;
  setActiveMenu: (label: string) => void;
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  activeMenu,
  setActiveMenu,
}: SidebarProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <aside
      className={`fixed md:relative w-64 bg-blue-700 text-white z-50 shadow-xl transition-transform transform duration-300 ease-in-out md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } h-screen overflow-y-auto flex flex-col`}
    >
      <div className="flex justify-between items-center p-6 pb-0">
        <h1 className="text-2xl font-bold">HRMS</h1>
        <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
          ✕
        </button>
      </div>
      <nav className="flex-1 p-6 pt-4 space-y-4">
        <SidebarItem
          icon={<Home />}
          label="Dashboard"
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
        <SidebarItem
          icon={<Briefcase />}
          label="Recruitment"
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
        <SidebarItem
          icon={<Users />}
          label="On-Boarding"
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
        <SidebarItemWithSubmenu
          icon={<UserSquare />}
          label="Employee"
          submenu={[
            '• Employee List',
            '• Add Employee',
            '• Employee Documents',
          ]}
          openSubmenu={openSubmenu}
          setOpenSubmenu={setOpenSubmenu}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
        <SidebarItemWithSubmenu
          icon={<CalendarCheck />}
          label="Attendance"
          submenu={['• Daily Attendance', '• Leave Request', '• Leave Balance']}
          openSubmenu={openSubmenu}
          setOpenSubmenu={setOpenSubmenu}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
        <SidebarItem
          icon={<CreditCard />}
          label="Payroll"
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
        <SidebarItem
          icon={<Plane />}
          label="Travel"
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
        <SidebarItem
          icon={<BarChart />}
          label="Reports"
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
        <SidebarItem
          icon={<Settings />}
          label="Settings"
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
      </nav>
    </aside>
  );
}
