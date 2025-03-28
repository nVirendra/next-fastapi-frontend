'use client';

import { Menu, Bell, User } from 'lucide-react';
import Button from '@/app/components/ui/Button';

interface TopbarProps {
  setSidebarOpen: (open: boolean) => void;
  handleCreate: () => void;
}

export default function Topbar({ setSidebarOpen, handleCreate }: TopbarProps) {
  return (
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
  );
}
