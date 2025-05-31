import React from 'react';
import AdminHome from '../AdminPages/AdminHome/AdminHome.jsx';
import UserHome from '../UserPages/UserHome/UserHome.jsx';
import useAdmin from '../../hooks/useAdmin.jsx';
import Loading from '../../components/Loading/Loading.jsx';
import useAuth from '../../hooks/useAuth.jsx';

const DashboardHome = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const {loading} = useAuth()
  
  // if(loading){
  //   return <Loading/>
  // }
  
  if (loading || isAdminLoading || isAdmin === null) {
    return <Loading/>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      {isAdmin ? <AdminHome /> : <UserHome />}
    </div>
  );
};

export default DashboardHome;
