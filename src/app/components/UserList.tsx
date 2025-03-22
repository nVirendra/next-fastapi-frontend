'use client';
import { useEffect, useState } from 'react';
import { UserCreate, User } from '../types/user';
import UserForm from './UserForm';
import UserTable from './UserTable';
import { fetchUsers, createUser, updateUser, deleteUser } from '@/lib/api';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const loadUsers = async () => {
    const data = await fetchUsers(search);
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, [search]);

  const handleCreate = async (userData: UserCreate) => {
    if (selectedUser) {
      await updateUser(selectedUser.id, userData);
      setSelectedUser(null);
    } else {
      await createUser(userData);
    }
    loadUsers();
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    loadUsers();
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <input
        className="border p-2 mb-4 w-full"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <UserForm onSubmit={handleCreate} selectedUser={selectedUser} />
      <UserTable
        users={users}
        onEdit={setSelectedUser}
        onDelete={handleDelete}
      />
    </div>
  );
}
