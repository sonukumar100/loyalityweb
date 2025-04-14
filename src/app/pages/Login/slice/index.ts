import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
// import { loginSaga } from './saga';
import { LoginState } from './types';
import { endpoints, formatErrors, baseQuery } from 'utils/api/endpoints';
import { use } from 'i18next';
// import { Login } from 'types/Login';
export const initialState: LoginState = {
  loading: false,
  error: null,
  user: null,
  isLoggedIn: false,
};

// export const slice = createSlice({
//   name: 'login',
//   initialState,
//   reducers: {
//     doLogin(state, action: PayloadAction<any>) {
//       state.loading = true;
//     },
//     loginSuccess(state, action: PayloadAction<any>) {
//       state.loading = false;
//       state.user = action.payload.user;
//       state.isLoggedIn = true;
//     },
//     loginError(state, action: PayloadAction<any>) {
//       state.loading = false;
//       state.error = action.payload.error;
//     },
//   },
// });
// export const { actions: loginActions } = slice;

export const api = createApi({
  reducerPath: 'loginApi',
  baseQuery,
  endpoints: build => ({
    sendOtp: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.sendOtp,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    verifyOtp: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.verifyOtp,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      transformResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue?.data;
      },
    }),
    otpCall: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.otpCall,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      transformResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue?.data;
      },
    }),
    resetPassword: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.resetPassword,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    resetVerifyOtp: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.resetVerifyOtp,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    resetPassWordApi: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.resetPassWordApi,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    resetPassOtpCall: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.resetPassOtpCall,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
  }),
});

export const useLoginSlice = () => {
  useInjectReducer({ key: api.reducerPath, reducer: api.reducer });
  return {
    useSendOtpMutation: api.useSendOtpMutation,
    useVerifyOtpMutation: api.useVerifyOtpMutation,
    useResetPasswordMutation: api.useResetPasswordMutation,
    useOtpCallMutation: api.useOtpCallMutation,
    useResetVerifyOtpMutation: api.useResetVerifyOtpMutation,
    useResetPassWordApiMutation: api.useResetPassWordApiMutation,
    useResetPassOtpCallMutation: api.useResetPassOtpCallMutation,
  };
  // useInjectSaga({ key: slice.reducerPath, saga: loginSaga });
  // return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useLoginSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
