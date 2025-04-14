/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import { GlobalStyle } from 'styles/global-styles';

import { Login } from './pages/Login/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useGlobalSlice } from './slice';
import { Settings } from './pages/Admin/Settings/Loadable';
import { Dasboard } from './pages/User/Dasboard/Loadable';
import { ContactList } from './pages/User/AddContacts/components/Lead/contact-lead-list';
import { useIdleTimer } from 'utils/useIdletimer';
import { useDispatch, useSelector } from 'react-redux';
import ForgotPassword from './pages/Login/components/forgot-password';
import ResetPassword from './pages/Login/components/reset-password';
import ResetPassVerifyOtp from './pages/Login/components/resetpass-verify-otp';
import { BuildersContact } from './pages/Admin/BuildersContact/Loadable';
import { RecruitsContact } from './pages/Admin/RecruitsContact/Loadable';
import { useLeadSlice } from './pages/User/AddContacts/slice';
import { selectCalling, selectUser } from './slice/selectors';
import { setTimeout } from 'timers';
import { LeadAcceptReject } from './components/Shared/lead-aacept-reject';
import { AgentsContact } from './pages/Admin/AgentsContact/Loadable';
import { Calls } from './components/Shared/call';
import Video from './pages/Admin/Settings/components/video/video';
import DailyCouponAccess from './pages/Admin/Settings/components/daily-coupon-access';
import { BrandPoints } from './pages/Admin/Settings/components/product-point';
import ProductPoints from './pages/Admin/Settings/components/brand-points';
import DigitalCatalog from './pages/Admin/Settings/components/digitalCatalog/catalog';
import { OfferList } from './pages/Offer';
// import { useGlobalSlice } from 'app/slice';

export function App() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { actions: globalActions, useLazyPollingQuery } = useGlobalSlice();
  const handleLogout = () => {
    // alert('You have been logged out due to inactivity.');
    dispatch(globalActions.clearUser());
    localStorage.clear();
    window.location.href = '/login';
  };

  // useIdleTimer(30 * 60 * 1000, handleLogout); // 30 minutes
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Future Mortgage"
        defaultTitle="Future Mortgage"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Future Mortgage" />
      </Helmet>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/settings" element={<Settings />}>
            {/* Nested Route (renders inside Outlet in Settings) */}
            <Route path="daily-coupon-access" element={<DailyCouponAccess />} />
            <Route path="product-points" element={<ProductPoints />} />

            <Route path="videos" element={<Video />} />
            <Route path="digital-catalog" element={<DigitalCatalog />} />

          </Route>
          <Route path="offer" element={<OfferList />} />
          {/* <Route path="/admin/settings" element={<Settings />} /> */}
          <Route path="/user/dasboard" element={<Dasboard />} />
          <Route path="/admin/contacts/leads" element={<ContactList />} />
          <Route path="/admin/contacts/agents" element={<AgentsContact />} />
          <Route
            path="/admin/contacts/builders"
            element={<BuildersContact />}
          />
          <Route
            path="/admin/contacts/recruits"
            element={<RecruitsContact />}
          />
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/resetpass-verify-otp" element={<ResetPassVerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* <GlobalStyle /> */}
    </BrowserRouter>
  );
}