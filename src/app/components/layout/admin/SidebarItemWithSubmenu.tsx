'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { LucideIcon } from 'lucide-react';

interface SidebarItemWithSubmenuProps {
  name: string;
  icon: LucideIcon;
  submenu: { name: string; href: string }[];
}

export default function SidebarItemWithSubmenu({
  name,
  icon: Icon,
  submenu,
}: SidebarItemWithSubmenuProps) {
  const pathname = usePathname();
  const isParentActive = submenu.some((s) => pathname.startsWith(s.href));

  return (
    <div>
      <div
        className={clsx(
          'flex items-center px-3 py-2 rounded-md text-sm font-medium transition',
          isParentActive ? 'bg-blue-600 text-white' : 'text-gray-800'
        )}
      >
        <Icon className="w-5 h-5" />
        <span className="ml-2 hidden md:block">{name}</span>
      </div>

      <div className="ml-6 mt-1 space-y-1">
        {submenu.map((sub) => {
          const isSubActive =
            pathname === sub.href || pathname.startsWith(sub.href);
          return (
            <Link
              key={sub.name}
              href={sub.href}
              className={clsx(
                'block px-3 py-1 rounded-md text-sm',
                isSubActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100 text-gray-700'
              )}
            >
              {sub.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
