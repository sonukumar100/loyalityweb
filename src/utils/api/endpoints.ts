import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from 'types';
import { Toaster } from 'app/components/ui/toaster';

import { useToast } from 'app/components/ui/use-toast';
import { showToast } from './toast';
import { url } from 'inspector';
import { add } from 'date-fns';
import { get } from 'http';

const baseUrl = 'http://localhost:8001/api/v1/';
console.log('endPoint url ', baseUrl);

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

  addTeamMember: {
    url: `/api/admin/team-member/add`,
    method: HTTP_METHODS.POST,
  },
  adminUserList: {
    url: `/api/admin/team-member/list`,
    method: HTTP_METHODS.GET,
  },
  role: {
    url: `/api/list/roles`,
    method: HTTP_METHODS.GET,
  },
  locations: {
    url: `/api/list/locations`,
    method: HTTP_METHODS.GET,
  },
  uploadFile: {
    url: `/api/upload/files`,
    method: HTTP_METHODS.POST,
  },
  updateProfile: {
    url: `/api/admin/update-profile`,
    method: HTTP_METHODS.PUT,
  },

  updateTeamMember: {
    url: `/api/admin/team-member/update`,
    method: HTTP_METHODS.PUT,
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

  ///// lead api ///
  addLead: {
    url: `/api/lead/add`,
    method: HTTP_METHODS.POST,
  },
  updateLead: {
    url: `/api/lead/update`,
    method: HTTP_METHODS.PUT,
  },
  leadList: {
    url: `/api/leads/list`,
    method: HTTP_METHODS.GET,
  },
  deleteLead: {
    url: `/api/lead/delete`,
    method: HTTP_METHODS.DELETE,
  },
  campaiganList: {
    url: '/api/campaign/list',
    method: HTTP_METHODS.GET,
  },
  /// add loan ///
  addLoan: {
    url: '/api/loan/add',
    method: HTTP_METHODS.POST,
  },
  updateLoan: {
    url: '/api/loan/update',
    method: HTTP_METHODS.PUT,
  },
  loanList: {
    url: '/api/loans/list',
    method: HTTP_METHODS.GET,
  },
  addNotes: {
    url: '/api/note/add',
    method: HTTP_METHODS.POST,
  },
  noteList: {
    url: '/api/notes/list',
    method: HTTP_METHODS.GET,
  },

  //// get voice  twilio Token /////
  getTwilioVoiceToken: {
    url: '/api/twilio/token',
    method: HTTP_METHODS.GET,
  },
  polling: {
    url: '/api/new-lead',
    method: HTTP_METHODS.GET,
  },
  accepetRejectLead: {
    url: 'api/lead/accept-reject',
    method: HTTP_METHODS.POST,
  },
  addAgent: {
    url: '/api/create-agents',
    method: HTTP_METHODS.POST,
  },
  updateAgent: {
    url: '/api/create-agents',
    method: HTTP_METHODS.POST,
  },
  agentList: {
    url: '/api/agents-list',
    method: HTTP_METHODS.GET,
  },
  deleteAgent: {
    url: '/api/delete-agents',
    method: HTTP_METHODS.DELETE,
  },
  addBuilder: {
    url: '/api/create-builder',
    method: HTTP_METHODS.POST,
  },
  updateBuilder: {
    url: '/api/create-builder',
    method: HTTP_METHODS.POST,
  },
  builderList: {
    url: '/api/builder-list',
    method: HTTP_METHODS.GET,
  },
  deleteBuilder: {
    url: '/api/delete-builder',
    method: HTTP_METHODS.DELETE,
  },
  addRecruit: {
    url: '/api/create-recruits',
    method: HTTP_METHODS.POST,
  },
  recruitsList: {
    url: '/api/recruits-list',
    method: HTTP_METHODS.GET,
  },
  updateRecruit: {
    url: '/api/create-recruits',
    method: HTTP_METHODS.POST,
  },
  deleteRecruit: {
    url: '/api/delete-recruits',
    method: HTTP_METHODS.DELETE,
  },
  newAddNotes: {
    url: '/api/notes/create-update',
    method: HTTP_METHODS.POST,
  },
  newNoteList: {
    url: '/api/note/list',
    method: HTTP_METHODS.GET,
  },
  addTask: {
    url: '/api/task/add',
    method: HTTP_METHODS.POST,
  },
  tasksList: {
    url: '/api/tasks/list',
    method: HTTP_METHODS.GET,
  },
  deleteTask: {
    url: '/api/task/delete',
    method: HTTP_METHODS.DELETE,
  },
  getNotifications: {
    url: '/api/notification/lists',
    method: HTTP_METHODS.GET,
  },
  patchNotification: {
    url: '/api/notification/update',
    method: HTTP_METHODS.PATCH,
  },
  getAllStates: {
    url: '/api/state',
    method: HTTP_METHODS.GET,
  },
  chatTwilioToken: {
    url: '/api/twilio/sms-token',
    method: HTTP_METHODS.GET,
  },
};
