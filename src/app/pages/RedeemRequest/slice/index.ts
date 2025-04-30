import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { useInjectReducer } from 'utils/redux-injectors';
import { RedeemEdit } from './types';
import { endpoints, formatErrors, baseQuery } from 'utils/api/endpoints';
export const initialState: RedeemEdit = {
  edit: null,
};

export const slice = createSlice({
  name: 'redeemEdit',
  initialState,
  reducers: {
    setEdit(state, action: PayloadAction<any>) {
      state.edit = action.payload.data;
    },
  },
});

export const api = createApi({
  reducerPath: 'RedeemApi',
  baseQuery,
  tagTypes: ['UpdateRedeem', 'UpdateShippedStatus'],
  endpoints: build => ({
    redeemRequest: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.redeemRequest,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
      providesTags: ['UpdateRedeem', 'UpdateShippedStatus'],
    }),
    getRedeemAllCount: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.getCountAllRedeemRequest,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
    }),
    updateRedeemRequest: build.mutation<any, any>({
      query: (body: FormData) => ({
        ...endpoints.updateRedeemRequest,
        body,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['UpdateRedeem'],
    }),
    updateRedeemStatusRequest: build.mutation<any, any>({
      query: (body: FormData) => ({
        ...endpoints.updateRedeemStatusRequest,
        body,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['UpdateShippedStatus'],
    }),
  }),
});

export const useRedeemSlice = () => {
  useInjectReducer({ key: api.reducerPath, reducer: api.reducer });
  useInjectReducer({ key: slice.reducerPath, reducer: slice.reducer });

  return {
    actions: slice.actions,
    useLazyRedeemRequestQuery: api.useLazyRedeemRequestQuery,
    useLazyGetRedeemAllCountQuery: api.useLazyGetRedeemAllCountQuery,
    useUpdateRedeemRequestMutation: api.useUpdateRedeemRequestMutation,
    useUpdateRedeemStatusRequestMutation:
      api.useUpdateRedeemStatusRequestMutation,
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
