import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from 'types';

const baseUrl = 'http://localhost:8001/api/v1/';
console.log('endPoint url ', baseUrl);
// https://api.futuremortgage.com/
// const defaultHeaders = {
//   'Content-Type': 'application/json',
// };
const defaultHeaders = {
  Accept: 'application/json',
};

const prepareHeaders = (headers: any, { getState }) => {
  // const { toast } = useToast();

  const token = (getState() as RootState)?.global?.user?.tokens[0]?.token;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};
const originalBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders,
  headers: defaultHeaders,
});
export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await originalBaseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
  return result;
};
// export const baseQuery = fetchBaseQuery({
//   baseUrl,
//   headers: defaultHeaders,
//   prepareHeaders,
// });

export const formatErrors = (errors: any) => {
  console.log('formatErrors', errors?.messages);
  return errors?.messages || 'Something went wrong';
};

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

export const endpoints = {
  baseUrl,

  sendOtp: {
    url: `/auth/login/send-otp`,
    method: HTTP_METHODS.POST,
  },
  verifyOtp: {
    url: `/auth/login/verify-otp`,
    method: HTTP_METHODS.POST,
  },
  otpCall: {
    url: `/auth/login/otp-call`,
    method: HTTP_METHODS.POST,
  },
  resetPassword: {
    url: `/auth/reset-password/send-otp`,
    method: HTTP_METHODS.POST,
  },

  addBrandPoints: {
    url: `admins/addMasterProduct`,
    method: HTTP_METHODS.POST,
  },
  getBrandPoints: {
    url: `admins/get-masterProduct`,
    method: HTTP_METHODS.GET,
  },
  dailyAccessLimit: {
    url: 'admins/daily-access-limit',
    method: HTTP_METHODS.POST,
  },
  getDailyAccessLimit: {
    url: 'admins/get-daily-access-limit',
    method: HTTP_METHODS.GET,
  },
  deleteBrand: {
    url: `/admins/deleteMasterProduct`,
    method: HTTP_METHODS.DELETE,
  },
  addVideo: {
    url: `/admins/add-video`,
    method: HTTP_METHODS.POST,
  },
  getVideo: {
    url: `/admins/get-video`,
    method: HTTP_METHODS.GET,
  },
  addDigitalCatalog: {
    url: `/admins/add-digital-catalog`,
    method: HTTP_METHODS.POST,
  },
  getDigitalCatalog: {
    url: `/admins/get-digital-catalog`,
    method: HTTP_METHODS.GET,
  },
  deleteDigitalCatalog: {
    url: `/admins/delete-digital-catalog`,
    method: HTTP_METHODS.DELETE,
  },
  offerList: {
    url: `/admins/get-offers`,
    method: HTTP_METHODS.GET,
  },
  addOffer: {
    url: `/admins/add-offer`,
    method: HTTP_METHODS.POST,
  },
  getOffer: {
    url: `/admins/get-offers`,
    method: HTTP_METHODS.GET,
  },
  updateOffer: {
    url: `/admins/update-offer`,
    method: HTTP_METHODS.PUT,
  },
  updateOfferStatus: {
    url: `/admins/update-offer-status`,
    method: HTTP_METHODS.PUT,
  },
  getOfferById: {
    url: `/admins/get-offer-by-id`,
    method: HTTP_METHODS.GET,
  },
  deleteOffer: {
    url: `/admins/delete-offer`,
    method: HTTP_METHODS.DELETE,
  },
  addGiftGallery: {
    url: `/admins/add-gift-gallery`,
    method: HTTP_METHODS.POST,
  },
  updateGiftGallery: {
    url: `/admins/update-gift-gallery`,
    method: HTTP_METHODS.POST,
  },
  deleteGiftGallery: {
    url: `/admins/delete-gift-gallery`,
    method: HTTP_METHODS.DELETE,
  },
  getGiftGallery: {
    url: `/admins/gift-gallery-list`,
    method: HTTP_METHODS.GET,
  },
  generateCoupon: {
    url: `/admins/generate-coupon`,
    method: HTTP_METHODS.POST,
  },
  getCouponList: {
    url: `/admins/coupon/list`,
    method: HTTP_METHODS.GET,
  },
  deleteCouponById: {
    url: `/admins/delete-coupon`,
    method: HTTP_METHODS.DELETE,
  },
  updateCoupon: {
    url: `/admins/update-coupon`,
    method: HTTP_METHODS.PUT,
  },
  redeemRequest: {
    url: `/admins/redeem-request-list`,
    method: HTTP_METHODS.GET,
  },

  status: {
    url: `/api/admin/update/status`,
    method: HTTP_METHODS.PUT,
  },
  resetVerifyOtp: {
    url: '/auth/reset-password/verify-otp',
    method: HTTP_METHODS.POST,
  },
  resetPassWordApi: {
    url: '/auth/reset-password',
    method: HTTP_METHODS.POST,
  },
  resetPassOtpCall: {
    url: '/auth/reset-password/otp-call',
    method: HTTP_METHODS.POST,
  },
  getCountAllRedeemRequest: {
    url: `/admins/get-all-redeem-req-count`,
    method: HTTP_METHODS.GET,
  },
  updateRedeemRequest: {
    url: `/admins/update-redeem-status`,
    method: HTTP_METHODS.POST,
  },
};
