'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { LucideIcon, ChevronDown } from 'lucide-react';
import { useState } from 'react';

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
  const [expanded, setExpanded] = useState(false);
  const isParentActive = submenu.some((s) => pathname.startsWith(s.href));

  return (
    <div>
      <div
        onClick={() => setExpanded(!expanded)}
        className={clsx(
          'flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer text-sm font-medium transition duration-200',
          isParentActive
            ? 'bg-white text-blue-800 shadow-sm'
            : 'text-blue-100/90 hover:bg-blue-600 hover:text-white'
        )}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5" />
          <span className="hidden md:block">{name}</span>
        </div>
        <ChevronDown
          className={clsx(
            'w-4 h-4 transition-transform duration-200',
            expanded && 'rotate-180'
          )}
        />
      </div>

      <div
        className={clsx(
          'ml-5 mt-1 space-y-1 overflow-hidden transition-all',
          expanded ? 'max-h-96' : 'max-h-0'
        )}
      >
        {submenu.map((sub) => {
          const isSubActive =
            pathname === sub.href || pathname.startsWith(sub.href);
          return (
            <Link
              key={sub.name}
              href={sub.href}
              className={clsx(
                'block px-3 py-1.5 rounded-md text-sm transition duration-150',
                isSubActive
                  ? 'bg-blue-100 text-blue-800 font-medium'
                  : 'hover:bg-blue-600 text-blue-100 hover:text-white'
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
