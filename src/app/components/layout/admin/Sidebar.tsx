'use client';

import { adminSidebarLinks } from './adminLinks';
import SidebarItem from './SidebarItem';
import SidebarItemWithSubmenu from './SidebarItemWithSubmenu';

export default function AdminSidebar() {
  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-blue-700 to-blue-800 text-white p-4 shadow-xl overflow-y-auto sticky top-0">
      <div className="p-4 mb-6">
        <h1 className="text-2xl font-bold tracking-wide text-white">
          Admin Panel
        </h1>
      </div>

      <nav className="space-y-1">
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
