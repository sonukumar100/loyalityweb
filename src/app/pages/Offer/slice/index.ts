import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
// import { loginSaga } from './saga';
import { offerState } from './types';
import { endpoints, formatErrors, baseQuery } from 'utils/api/endpoints';
import { use } from 'i18next';
import { get } from 'http';
import { up } from 'inquirer/lib/utils/readline';
// import { Login } from 'types/Login';
export const initialState: offerState = {
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
  reducerPath: 'Api',
  baseQuery,
  tagTypes: ['AddOffer', 'UpdateOffer'],
  endpoints: build => ({
    addOffer: build.mutation<any, any>({
      query: (body: FormData) => ({
        ...endpoints.addOffer,
        body,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['AddOffer'],
    }),
    // lazay

    getOffer: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.getOffer,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
      providesTags: ['AddOffer', 'UpdateOffer'],
    }),

    getOfferById: build.query<any, any>({
      query: (body: FormData) => ({
        ...endpoints.getOfferById,
        body,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      // invalidatesTags: ['Offer'],
    }),
    updateOffer: build.mutation<any, any>({
      query: (body: FormData) => ({
        ...endpoints.updateOffer,
        body,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      // invalidatesTags: ['UpdateOffer'],
    }),
    updateOfferStatus: build.mutation<any, any>({
      query: body => ({
        ...endpoints.updateOfferStatus,
        body,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['UpdateOffer'],
    }),
    deleteOffer: build.mutation<any, any>({
      query: (body: FormData) => ({
        ...endpoints.deleteOffer,
        body,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      // invalidatesTags: ['Offer'],
    }),

    // addOffer: build.mutation<any, any>({
    //   query: body => {
    //     return {
    //       ...endpoints.addOffer,
    //       body,
    //     };
    //   }
    //   ,
    //   transformErrorResponse(baseQueryReturnValue, meta, arg) {
    //     return formatErrors(baseQueryReturnValue.data);
    //   },
    //   // invalidatesTags: ['Offer'],
    // }),
  }),
});

export const useOfferSlice = () => {
  useInjectReducer({ key: api.reducerPath, reducer: api.reducer });
  return {
    useAddOfferMutation: api.useAddOfferMutation,
    useLazyGetOfferQuery: api.useLazyGetOfferQuery,
    useUpdateOfferStatus: api.useUpdateOfferStatusMutation,
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
