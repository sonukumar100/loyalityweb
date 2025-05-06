import { createApi } from '@reduxjs/toolkit/query/react';
import { useInjectReducer } from 'utils/redux-injectors';
import { chatState } from './types';
import { endpoints, formatErrors, baseQuery } from 'utils/api/endpoints';
export const initialState: chatState = {
  loading: false,
  error: null,
  chat: null,
};

export const api = createApi({
  reducerPath: 'chatApi',
  baseQuery,
  endpoints: build => ({
    getFeedBackUnique: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.getMsgUniqueData,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
    }),
  }),
});

export const useChatSlice = () => {
  useInjectReducer({ key: api.reducerPath, reducer: api.reducer });
  return {
    useLazyGetFeedBackUniqueQuery: api.useLazyGetFeedBackUniqueQuery,
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
