'use client';
import { useEffect, useState } from 'react';
import { User, UserCreate } from '../types/user';
import UserForm from './UserForm';
import UserTable from './UserTable';
import { fetchUsers, createUser, updateUser, deleteUser } from '@/lib/api';

const PAGE_SIZE = 5;

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const loadUsers = async () => {
    const skip = (currentPage - 1) * PAGE_SIZE;
    const data = await fetchUsers(search, skip, PAGE_SIZE);
    setUsers(data);
    setHasMore(data.length === PAGE_SIZE);
  };

  useEffect(() => {
    loadUsers();
  }, [search, currentPage]);

  const handleCreate = async (userData: UserCreate) => {
    if (selectedUser) {
      await updateUser(selectedUser.id, userData);
      setSelectedUser(null);
    } else {
      await createUser(userData);
    }
    setCurrentPage(1); // reset to first page after create/update
    loadUsers();
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    loadUsers();
  };

  const handlePageChange = (page: number) => {
    if (page >= 1) setCurrentPage(page);
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <input
        className="border p-2 mb-4 w-full"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      <UserForm onSubmit={handleCreate} selectedUser={selectedUser} />
      <UserTable
        users={users}
        onEdit={setSelectedUser}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-3 py-1 border rounded bg-gray-100">
          Page {currentPage}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasMore}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
