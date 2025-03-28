'use client';

import { useState } from 'react';
import Sidebar from '@/app/components/layout/admin/Sidebar';
import Topbar from '@/app/components/layout/admin/Topbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string>('Dashboard');

  const handleCreate = () => {
    alert('Create button clicked!');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar setSidebarOpen={setSidebarOpen} handleCreate={handleCreate} />
        <main className="p-4 sm:p-6 w-full">{children}</main>
      </div>
    </div>
  );
}
