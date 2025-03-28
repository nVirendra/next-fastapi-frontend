import React from 'react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  activeMenu: string;
  setActiveMenu: (label: string) => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  activeMenu,
  setActiveMenu,
}) => {
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
};
