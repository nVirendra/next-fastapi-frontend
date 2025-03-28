'use client';

import { useState } from 'react';
import Topbar from './Topbar';

export default function TopbarClientWrapper() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCreate = () => {
    alert('Create button clicked!');
  };

  return <Topbar setSidebarOpen={setSidebarOpen} handleCreate={handleCreate} />;
}
