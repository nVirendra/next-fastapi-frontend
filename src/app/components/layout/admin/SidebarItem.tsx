'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  name: string;
  href: string;
  icon: LucideIcon;
}

export default function SidebarItem({
  name,
  href,
  icon: Icon,
}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center px-3 py-2 rounded-md transition text-sm font-medium',
        isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-800'
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="ml-2 hidden md:block">{name}</span>
    </Link>
  );
}
