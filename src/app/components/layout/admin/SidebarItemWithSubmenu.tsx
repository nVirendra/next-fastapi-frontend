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
    <div className="space-y-1">
      <div
        onClick={() => setExpanded(!expanded)}
        className={clsx(
          'flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer font-medium transition-all duration-200',
          isParentActive
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-blue-100 hover:bg-blue-600/80 hover:text-white'
        )}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5" />
          <span>{name}</span>
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
          'ml-8 space-y-1 overflow-hidden transition-all duration-300 ease-in-out',
          expanded ? 'max-h-96 py-2' : 'max-h-0'
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
                'block px-4 py-2 rounded-md text-sm transition duration-150',
                isSubActive
                  ? 'bg-blue-600 text-white font-medium'
                  : 'text-blue-100 hover:bg-blue-600/50 hover:text-white'
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
