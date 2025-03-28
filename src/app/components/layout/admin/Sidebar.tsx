'use client';

import { adminSidebarLinks } from './adminLinks';
import SidebarItem from './SidebarItem';
import SidebarItemWithSubmenu from './SidebarItemWithSubmenu';

export default function AdminSidebar() {
  return (
    <aside className="w-64 h-screen bg-blue-700 text-white p-5 shadow-xl overflow-y-auto">
      <h1 className="text-2xl font-bold mb-8 tracking-wide">Admin Panel</h1>

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
