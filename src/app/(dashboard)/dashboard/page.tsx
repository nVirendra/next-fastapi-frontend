'use client';

import { useState } from 'react';
import {
  Menu,
  X,
  Home,
  Briefcase,
  Users,
  CalendarCheck,
  Settings,
  Bell,
  User,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Plane,
  BarChart,
  UserSquare,
} from 'lucide-react';
import Button from '@/app/components/ui/Button';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string>('Dashboard');

  const handleCreate = () => {
    alert('Create button clicked!');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 bg-blue-700 text-white z-50 shadow-xl transition-transform transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } h-screen overflow-y-auto flex flex-col`}
      >
        <div className="flex justify-between items-center p-6 pb-0">
          <h1 className="text-2xl font-bold">HRMS</h1>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
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
            submenu={[
              '• Daily Attendance',
              '• Leave Request',
              '• Leave Balance',
            ]}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-md px-4 sm:px-6 py-4 flex justify-between items-center w-full sticky top-0 z-40">
          <div className="flex items-center space-x-4">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-gray-700">Dashboard</h2>
          </div>
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Button className="bg-green-600 text-white" onClick={handleCreate}>
              Create
            </Button>
            <Bell
              size={24}
              className="text-gray-600 hover:text-blue-600 cursor-pointer"
            />
            <Button className="bg-blue-600 text-white flex items-center space-x-2">
              <User size={18} />
              <span>Profile</span>
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          <StatCard title="Total Employees" value="256" />
          <StatCard title="Active Users" value="180" />
          <StatCard title="Leaves Pending" value="12" />
          <StatCard title="Payroll Processed" value="$120K" />
        </main>
      </div>
    </div>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  activeMenu: string;
  setActiveMenu: (label: string) => void;
}

function SidebarItem({
  icon,
  label,
  activeMenu,
  setActiveMenu,
}: SidebarItemProps) {
  return (
    <div
      className={`flex items-center space-x-3 text-lg py-3 px-4 rounded-md cursor-pointer transition duration-200 ${
        activeMenu === label ? 'bg-blue-500' : 'hover:bg-blue-500'
      }`}
      onClick={() => setActiveMenu(label)}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

interface SidebarItemWithSubmenuProps extends SidebarItemProps {
  submenu: string[];
  openSubmenu: string | null;
  setOpenSubmenu: (label: string | null) => void;
}

function SidebarItemWithSubmenu({
  icon,
  label,
  submenu,
  openSubmenu,
  setOpenSubmenu,
  activeMenu,
  setActiveMenu,
}: SidebarItemWithSubmenuProps) {
  const isOpen = openSubmenu === label;
  return (
    <div>
      <div
        className={`flex items-center justify-between text-lg py-3 px-4 rounded-md cursor-pointer transition duration-200 ${
          isOpen || activeMenu === label ? 'bg-blue-500' : 'hover:bg-blue-500'
        }`}
        onClick={() => {
          setOpenSubmenu(isOpen ? null : label);
          setActiveMenu(label);
        }}
      >
        <div className="flex items-center space-x-3">
          {icon}
          <span>{label}</span>
        </div>
        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </div>
      {isOpen && (
        <div className="ml-8 space-y-2 text-sm text-gray-200">
          {submenu.map((item, index) => (
            <div
              key={index}
              className={`py-2 cursor-pointer px-4 rounded-md transition duration-200 ${
                activeMenu === item ? 'bg-blue-400' : 'hover:bg-blue-400'
              }`}
              onClick={() => setActiveMenu(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 text-center border-t-4 border-blue-600 transition-transform transform hover:scale-105 duration-200">
      <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
      <p className="text-3xl font-bold text-blue-700">{value}</p>
    </div>
  );
}
