import AdminSidebar from '../components/layout/admin/Sidebar';
import TopbarClientWrapper from '../components/layout/admin/TopbarClientWrapper';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <TopbarClientWrapper />
        <main className="p-4 sm:p-6 w-full">{children}</main>
      </div>
    </div>
  );
}
