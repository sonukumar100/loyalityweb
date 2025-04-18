import React, { memo, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { selectNewNotifications, selectUser } from 'app/slice/selectors';
import { Input } from 'app/components/ui/input';
import { useGlobalSlice } from 'app/slice';
import { Toaster } from 'app/components/ui/toaster';
import { Link, useLocation, } from 'react-router-dom';
import NotificationsSocket from 'utils/notificationsSocket';

interface Props {
  className?: string;
}

export const Header = memo((props: Props) => {

  const user = useSelector(selectUser);
  const isNewNotifications = useSelector(selectNewNotifications);
  const userId = user?._id;
  const location = useLocation();
  const { useGetNotificationsQuery } = useGlobalSlice();
  const [getNotifications] = useGetNotificationsQuery();

  useEffect(() => {
    if (userId) {
      getNotifications(userId);
    }
  }, [isNewNotifications?.isNotifications]);

  NotificationsSocket(userId);

  return (
    <header className="container animate-fade-in-down">
      <Toaster />
      <nav className="mt-10">
        <div
          className="flex justify-between items-center rounded-full px-8 py-4 shadow-xl backdrop-blur-md border border-white/30 transition-all duration-700 ease-in-out hover:scale-[1.02]"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.25) 0%, rgba(220, 230, 245, 0.3) 100%)',
          }}
        >
          <div className="flex items-center space-x-6">
            <Link
              to="#"
              className="text-black font-extrabold text-2xl rounded-lg bg-transparent"
            >
              Loyalty
            </Link>
            <div className="relative hidden md:block">
              <Input
                placeholder="Search..."
                type="text"
                className="w-14 md:w-56 lg:w-72 h-12 rounded-full bg-white/60 border border-[#C0C9D6] placeholder:text-gray-600 pl-12 pr-4 transition-all duration-500 focus:w-80 focus:pl-12 focus:bg-white"
              />
            </div>
          </div>

          <ul className="hidden lg:flex space-x-3">
            {[
              { label: 'Dashboard', path: '/user/dasboard' },
              { label: 'Contacts', path: '#' },
              { label: 'Offer', path: '/offer' },
              { label: 'Redeem Request', path: '/redeem-request' },
              { label: 'Coupon', path: '/coupon' },
              { label: 'Payroll', path: '#' },
              { label: 'Master', path: '/admin/settings/digital-catalog' },
            ].map(({ label, path }) => {
              const isActive = location.pathname === path;
              return (
                <li key={label}>
                  <Link
                    to={path}
                    className={`px-5 py-2 text-sm font-semibold border rounded-full transition duration-300 ${isActive
                      ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                      : 'text-gray-700 border-[#B7C1CF] bg-white/30 backdrop-blur-sm hover:bg-white hover:text-blue-600 hover:shadow'
                      }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center space-x-4">
            {/* Right section (e.g. profile image, notifications) can be added here */}
          </div>
        </div>
      </nav>
    </header>
  );
});
