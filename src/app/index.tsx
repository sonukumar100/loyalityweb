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
import { useDispatch } from 'react-redux';
import ForgotPassword from './pages/Login/components/forgot-password';
import ResetPassword from './pages/Login/components/reset-password';
import ResetPassVerifyOtp from './pages/Login/components/resetpass-verify-otp';
import Video from './pages/Admin/Settings/components/video/video';
import DailyCouponAccess from './pages/Admin/Settings/components/daily-coupon-access';
import ProductPoints from './pages/Admin/Settings/components/brand-points';
import DigitalCatalog from './pages/Admin/Settings/components/digitalCatalog/catalog';
import { OfferList } from './pages/Offer';
import { GiftIndex } from './pages/Admin/Settings/components/gift/gift-index';
import { CouponList } from './pages/Coupon';
import { Toaster } from './components/ui/toaster';
import { RedeemList } from './pages/RedeemRequest';
// import { useGlobalSlice } from 'app/slice';

export function App() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { actions: globalActions } = useGlobalSlice();
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
            <Route path="gifts" element={<GiftIndex />} />
          </Route>
          <Route path="offer" element={<OfferList />} />
          <Route path="coupon" element={<CouponList />} />
          <Route path="redeem-request" element={<RedeemList />} />

          {/* <Route path="/admCouponApiin/settings" element={<Settings />} /> */}
          <Route path="/user/dasboard" element={<Dasboard />} />
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/resetpass-verify-otp" element={<ResetPassVerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />

      {/* <GlobalStyle /> */}
    </BrowserRouter>
  );
}
