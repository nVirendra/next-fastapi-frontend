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
        'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition duration-200',
        isActive
          ? 'bg-white text-blue-800 shadow-sm'
          : 'hover:bg-blue-600 hover:text-white text-blue-100/90'
      )}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span className="hidden md:block">{name}</span>
    </Link>
  );
}
