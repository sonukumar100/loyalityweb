import React, { memo } from 'react';
import Sidebar from './components/sidebar';
import { Outlet } from 'react-router-dom';
// import { Settings } from 'lucide-react';
interface Props { }

export const Settings = memo((props: Props) => {

  return (
    <div>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-grow p-6 bg-gray-100">
          <Outlet /> {/* renders the page component */}
        </div>
      </div>
    </div>
  );
});
