'use client';

import StatCard from '@/app/components/layout/admin/StatCard';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <StatCard title="Total Employees" value="256" />
      <StatCard title="Active Users" value="180" />
      <StatCard title="Leaves Pending" value="12" />
      <StatCard title="Payroll Processed" value="$120K" />
    </div>
  );
}
