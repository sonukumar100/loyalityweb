import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
// import { loginSaga } from './saga';
import { CouponEdit } from './types';
import { endpoints, formatErrors, baseQuery } from 'utils/api/endpoints';
import { use } from 'i18next';
import { get } from 'http';
import { up } from 'inquirer/lib/utils/readline';
// import { Login } from 'types/Login';
export const initialState: CouponEdit = {
  edit: null,
};

export const slice = createSlice({
  name: 'couponEdit',
  initialState,
  reducers: {
    setEdit(state, action: PayloadAction<any>) {
      state.edit = action.payload.data;
    },
  },
});

export const api = createApi({
  reducerPath: 'CouponApi',
  baseQuery,
  tagTypes: ['GenerateCoupon', 'UpdateCoupon', 'DeleteCoupon', 'UpdateCoupon'],
  endpoints: build => ({
    generateCoupon: build.mutation<any, any>({
      query: (body: FormData) => ({
        ...endpoints.generateCoupon,
        body,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['GenerateCoupon'],
    }),
    // lazay

    getCouponList: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.getCouponList,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
      providesTags: ['GenerateCoupon', 'UpdateCoupon', 'DeleteCoupon', 'UpdateCoupon'],
    }),
    deleteCouponById: build.mutation<any, any>({
      query: id => ({
        url: `${endpoints.deleteCouponById.url}/${id}`,
        method: endpoints.deleteCouponById.method,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['DeleteCoupon'], // ✅ Add this line
    }),
    // updateCoupon: build.mutation<any, any>({
    //   query: (payload) => ({
    //     url: `${endpoints.updateCoupon.url}/${payload.id}`,
    //     method: endpoints.updateCoupon.method,
    //     body: payload,
    //   }),
    //   transformErrorResponse(baseQueryReturnValue, meta, arg) {
    //     return formatErrors(baseQueryReturnValue.data);
    //   },
    //   invalidatesTags: ['UpdateCoupon'], // ✅ Add this line
    // }),
    updateCoupon: build.mutation<any, any>({
      query: (body) => ({
        ...endpoints.updateCoupon,
        body,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['UpdateCoupon'],
    }),

    // deleteCouponById: build.mutation<any, any>({
    //   query: (body) => ({
    //     ...endpoints.deleteCouponById,
    //     body,
    //   }),
    //   transformErrorResponse(baseQueryReturnValue, meta, arg) {
    //     return formatErrors(baseQueryReturnValue.data);
    //   },
    //   invalidatesTags: ['DeleteCoupon'],
    // }),
  }),
});

export const useCouponSlice = () => {
  useInjectReducer({ key: api.reducerPath, reducer: api.reducer });
  useInjectReducer({ key: slice.reducerPath, reducer: slice.reducer });

  return {
    actions: slice.actions,
    useGenerateCoupon: api.useGenerateCouponMutation,
    useLazyGetCouponListQuery: api.useLazyGetCouponListQuery,
    useDeleteCouponById: api.useDeleteCouponByIdMutation,
    useUpdateCoupon: api.useUpdateCouponMutation,
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
