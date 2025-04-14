import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { endpoints, formatErrors, baseQuery } from 'utils/api/endpoints';
import { RecruitsEdit } from './types';

export const initialState: RecruitsEdit = {
  edit: null,
};
const slice = createSlice({
  name: 'recruitsEdit',
  initialState,
  reducers: {
    setEditRecruit(state, action: PayloadAction<any>) {
      state.edit = action.payload.data;
    },
  },
});

export const api = createApi({
  reducerPath: 'addRecruit',
  baseQuery,
  tagTypes: ['RecruitsList', 'DeleteRecruits', 'NoteList'],
  endpoints: build => ({
    addRecruit: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.addRecruit,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['RecruitsList'],
    }),
    updateRecruit: build.mutation<any, any>({
      query: body => {
        return {
          url: `${endpoints.updateRecruit.url}/${body._id}`,
          method: endpoints.updateRecruit.method,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['RecruitsList'],
    }),
    campaiganList: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.campaiganList,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
    }),
    recruitsList: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.recruitsList,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
      providesTags: ['RecruitsList'],
    }),
    deleteRecruit: build.mutation<any, any>({
      query: id => ({
        url: `${endpoints.deleteRecruit.url}/${id}`,
        method: endpoints.deleteRecruit.method,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    addLoan: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.addLoan,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['RecruitsList'],
    }),
    updateLoan: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.updateLoan,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['RecruitsList'],
    }),
    loanList: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.loanList,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
      providesTags: ['RecruitsList'],
    }),
    addNotes: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.newAddNotes,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['NoteList'],
    }),
    noteList: build.query<any, any>({
      query: params => {
        return {
          url: `${endpoints.newNoteList.url}?pageSize=${params.pageSize}&page=${params.page}&leadId=${params.recruitId}`,
          method: endpoints.newNoteList.method,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
      providesTags: ['NoteList'],
    }),
    getStates: build.query<any, any>({
      query: params => {
        return {
          url: endpoints.getAllStates.url,
          method: endpoints.getAllStates.method,
          params: params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
    }),
  }),
});

export const useRecruitSlice = () => {
  useInjectReducer({ key: api.reducerPath, reducer: api.reducer });
  useInjectReducer({ key: slice.reducerPath, reducer: slice.reducer });

  return {
    actions: slice.actions,
    useAddRecruitMutation: api.useAddRecruitMutation,
    useUpdateRecruitMutation: api.useUpdateRecruitMutation,
    useRecruitsListQuery: api.useLazyRecruitsListQuery,
    useCampaiganListQuery: api.useLazyCampaiganListQuery,
    useDeleteRecruitMutation: api.useDeleteRecruitMutation,
    useAddLoanMutation: api.useAddLoanMutation,
    useUpdateLoanMutation: api.useUpdateLoanMutation,
    useLoanListQuery: api.useLazyLoanListQuery,
    useAddNotesQuery: api.useAddNotesMutation,
    useNoteListQuery: api.useLazyNoteListQuery,
    useGetStatesQuery: api.useLazyGetStatesQuery,
  };
  // useInjectSaga({ key: slice.reducerPath, saga: loginSaga });
  // return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
