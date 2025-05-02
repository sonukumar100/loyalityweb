import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
// import { loginSaga } from './saga';
import { userState } from './types';
import { endpoints, formatErrors, baseQuery } from 'utils/api/endpoints';
export const initialState: userState = {
  loading: false,
  error: null,
  offer: null,
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
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: build => ({
    getUserList: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.getUserList,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
      providesTags: ['User'],
    }),

    // put methods
    verifyUser: build.mutation({
      query: (body: any) => ({
        url: `${endpoints.verifyUser.url}${body.id}`,
        method: endpoints.verifyUser.method,
        body,
      }),
      transformErrorResponse: (baseQueryReturnValue, meta, arg) => {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const useUserSlice = () => {
  useInjectReducer({ key: api.reducerPath, reducer: api.reducer });
  return {
    useLazyGetUserListQuery: api.useLazyGetUserListQuery,
    useVerifyUserMutation: api.useVerifyUserMutation,
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
