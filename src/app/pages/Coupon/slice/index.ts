import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
// import { loginSaga } from './saga';
import { couponState } from './types';
import { endpoints, formatErrors, baseQuery } from 'utils/api/endpoints';
import { use } from 'i18next';
import { get } from 'http';
import { up } from 'inquirer/lib/utils/readline';
// import { Login } from 'types/Login';
export const initialState: couponState = {
  loading: false,
  error: null,
  Coupon: null,
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
  reducerPath: 'CouponApi',
  baseQuery,
  tagTypes: ['AddCoupon', 'UpdateCoupon'],
  endpoints: build => ({
    addCoupon: build.mutation<any, any>({
      query: (body: FormData) => ({
        ...endpoints.addCoupon,
        body,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['AddCoupon'],
    }),
    // lazay

    getCoupon: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.getCoupon,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
      providesTags: ['AddCoupon', 'UpdateCoupon'],
    }),

    getCouponById: build.query<any, any>({
      query: (body: FormData) => ({
        ...endpoints.getCouponById,
        body,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      // invalidatesTags: ['Coupon'],
    }),
    updateCoupon: build.mutation<any, any>({
      query: (body: FormData) => ({
        ...endpoints.updateCoupon,
        body,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      // invalidatesTags: ['UpdateCoupon'],
    }),
    updateCouponStatus: build.mutation<any, any>({
      query: body => ({
        ...endpoints.updateCouponStatus,
        body,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['UpdateCoupon'],
    }),
    deleteCoupon: build.mutation<any, any>({
      query: (body: FormData) => ({
        ...endpoints.deleteCoupon,
        body,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      // invalidatesTags: ['Coupon'],
    }),

    // addCoupon: build.mutation<any, any>({
    //   query: body => {
    //     return {
    //       ...endpoints.addCoupon,
    //       body,
    //     };
    //   }
    //   ,
    //   transformErrorResponse(baseQueryReturnValue, meta, arg) {
    //     return formatErrors(baseQueryReturnValue.data);
    //   },
    //   // invalidatesTags: ['Coupon'],
    // }),
  }),
});

export const useCouponSlice = () => {
  useInjectReducer({ key: api.reducerPath, reducer: api.reducer });
  return {
    useAddCouponMutation: api.useAddCouponMutation,
    useLazyGetCouponQuery: api.useLazyGetCouponQuery,
    useUpdateCouponStatus: api.useUpdateCouponStatusMutation,
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
