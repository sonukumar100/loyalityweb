import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AdminLayout } from '../AdminLayout';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/slice/selectors';
import { LeadAcceptReject } from '../Shared/lead-aacept-reject';
import { CallContainer } from '../Shared/call-container';
interface Props { }

export function ProtectedRoute(props: Props) {
  const user = useSelector(selectUser);
  return user ? (
    <AdminLayout>
      <LeadAcceptReject />
      <CallContainer />
      <Outlet />
    </AdminLayout>
  ) : (
    <Navigate to="/login" />
    // <AdminLayout>
    //   <Outlet />
    // </AdminLayout>
  );
}
