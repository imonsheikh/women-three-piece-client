import React from 'react';
import AdminHome from '../AdminPages/AdminHome/AdminHome.jsx';
import UserHome from '../UserPages/UserHome/UserHome.jsx';
import useAdmin from '../../hooks/useAdmin.jsx';

const DashboardHome = () => {
  const [isAdmin, isAdminLoading] = useAdmin();

  if (isAdminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      {isAdmin ? <AdminHome /> : <UserHome />}
    </div>
  );
};

export default DashboardHome;
