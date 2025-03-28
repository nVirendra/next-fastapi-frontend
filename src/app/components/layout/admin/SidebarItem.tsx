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
        'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200',
        isActive
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-blue-100 hover:bg-blue-600/80 hover:text-white'
      )}
    >
      <Icon className="w-5 h-5" />
      <span>{name}</span>
    </Link>
  );
}
