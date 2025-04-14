import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { endpoints, formatErrors, baseQuery } from 'utils/api/endpoints';
import { LeadEdit } from './types';
import { use } from 'i18next';
export const initialState: LeadEdit = {
  edit: null,
  selectedStatus: null,
};
const slice = createSlice({
  name: 'leadEdit',
  initialState,
  reducers: {
    setEdit(state, action: PayloadAction<any>) {
      state.edit = action.payload.data;
    },
  },
});

export const api = createApi({
  reducerPath: 'addLeads',
  baseQuery,
  tagTypes: ['addLead', 'updateLead', 'DeleteLead', 'TwilioVoiceToken', 'NoteList', 'LeadList',],
  endpoints: build => ({
    addLead: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.addLead,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['LeadList'],
    }),
    updateLead: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.updateLead,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['LeadList'],
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
    leadList: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.leadList,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
      providesTags: ['LeadList'],
    }),
    deleteLead: build.mutation<any, any>({
      query: id => ({
        url: `${endpoints.deleteLead.url}/${id}`,
        method: endpoints.deleteLead.method,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['LeadList'],
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
    }),
    addNotes: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.addNotes,
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
          ...endpoints.noteList,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
      providesTags: ['NoteList'],
    }),
    twilioVoiceToken: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.getTwilioVoiceToken,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    addTask: build.mutation<any, any>({
      query: body => {
        return {
          url: endpoints.addTask.url,
          method: endpoints.addTask.method,
          body: body,
        };
      },
    }),
    updateTask: build.mutation<any, any>({
      query: body => {
        return {
          url: endpoints.addTask.url,
          method: endpoints.addTask.method,
          body: body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    tasksList: build.query<any, any>({
      query: params => {
        return {
          url: `${endpoints.tasksList.url}?pageSize=${params.pageSize}&page=${params.page}&contactId=${params.contactId}`,
          method: endpoints.tasksList.method,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
    }),
    deleteTask: build.mutation<any, any>({
      query: id => {
        return {
          url: `${endpoints.deleteTask.url}/${id}`,
          method: endpoints.deleteTask.method,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
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

export const useLeadSlice = () => {
  useInjectReducer({ key: api.reducerPath, reducer: api.reducer });
  useInjectReducer({ key: slice.reducerPath, reducer: slice.reducer });

  return {
    actions: slice.actions,
    useAddLeadMutation: api.useAddLeadMutation,
    useUpdateLeadMutation: api.useUpdateLeadMutation,
    useLeadListQuery: api.useLazyLeadListQuery,
    useCampaiganListQuery: api.useLazyCampaiganListQuery,
    useDeleteLeadMutation: api.useDeleteLeadMutation,
    useAddLoanMutation: api.useAddLoanMutation,
    useUpdateLoanMutation: api.useUpdateLoanMutation,
    useLoanListQuery: api.useLazyLoanListQuery,
    useAddNotesMutation: api.useAddNotesMutation,
    useNoteListQuery: api.useLazyNoteListQuery,
    useTwilioVoiceTokenMutation: api.useTwilioVoiceTokenMutation,
    useAddTasksMutation: api.useAddTaskMutation,
    useTasksListQuery: api.useLazyTasksListQuery,
    useUpdateTaskMutation: api.useUpdateTaskMutation,
    useDeleteTaskMutation: api.useDeleteTaskMutation,
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
