import { useState, useEffect } from 'react';
import { User, UserCreate } from '../types/user';

interface Props {
  onSubmit: (user: UserCreate) => void;
  selectedUser?: User | null;
}

export default function UserForm({ onSubmit, selectedUser }: Props) {
  const [form, setForm] = useState<UserCreate>({ name: '', email: '' });

  useEffect(() => {
    if (selectedUser)
      setForm({ name: selectedUser.name, email: selectedUser.email });
  }, [selectedUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        className="border p-2 w-full"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        className="border p-2 w-full"
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {selectedUser ? 'Update' : 'Create'} User
      </button>
    </form>
  );
}
