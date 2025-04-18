import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AdminLayout } from '../AdminLayout';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/slice/selectors';
interface Props { }

export function ProtectedRoute(props: Props) {
  const user = useSelector(selectUser);
  return user ? (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ) : (
    <Navigate to="/login" />
    // <AdminLayout>
    //   <Outlet />
    // </AdminLayout>
  );
}
