'use client';

import { adminSidebarLinks } from './adminLinks';
import SidebarItem from './SidebarItem';
import SidebarItemWithSubmenu from './SidebarItemWithSubmenu';

export default function AdminSidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r shadow-md p-4 overflow-y-auto">
      <h1 className="text-xl font-bold text-blue-700 mb-6">Admin Panel</h1>

      <nav className="space-y-2">
        {adminSidebarLinks.map((link) =>
          link.submenu ? (
            <SidebarItemWithSubmenu
              key={link.name}
              name={link.name}
              icon={link.icon}
              submenu={link.submenu}
            />
          ) : (
            <SidebarItem
              key={link.name}
              name={link.name}
              href={link.href}
              icon={link.icon}
            />
          )
        )}
      </nav>
    </aside>
  );
}
