import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarItemWithSubmenuProps {
  icon: React.ReactNode;
  label: string;
  submenu: string[];
  activeMenu: string;
  openSubmenu: string | null;
  setActiveMenu: (label: string) => void;
  setOpenSubmenu: (label: string | null) => void;
}

export const SidebarItemWithSubmenu: React.FC<SidebarItemWithSubmenuProps> = ({
  icon,
  label,
  submenu,
  activeMenu,
  openSubmenu,
  setActiveMenu,
  setOpenSubmenu,
}) => {
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
              className={`py-2 px-4 rounded-md cursor-pointer transition duration-200 ${
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
};
