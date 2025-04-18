import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
// import { loginSaga } from './saga';
import { RedeemEdit } from './types';
import { endpoints, formatErrors, baseQuery } from 'utils/api/endpoints';
// import { Login } from 'types/Login';
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
    }),
  }),
});

export const useRedeemSlice = () => {
  useInjectReducer({ key: api.reducerPath, reducer: api.reducer });
  useInjectReducer({ key: slice.reducerPath, reducer: slice.reducer });

  return {
    actions: slice.actions,
    useLazyRedeemRequestQuery: api.useLazyRedeemRequestQuery,
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
