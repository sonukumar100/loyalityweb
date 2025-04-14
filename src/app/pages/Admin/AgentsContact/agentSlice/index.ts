import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { endpoints, formatErrors, baseQuery } from 'utils/api/endpoints';
export const initialState: any = {
  edit: null,
};
const slice = createSlice({
  name: 'agentEdit',
  initialState,
  reducers: {
    setEdit(state, action: PayloadAction<any>) {
      state.edit = action.payload.data;
    },
  },
});

export const api = createApi({
  reducerPath: 'addAgent',
  baseQuery,
  tagTypes: ['AgentList', 'DeleteAgent', 'NoteList', 'Notifications'],
  endpoints: build => ({
    addAgent: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.addAgent,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['AgentList'],
    }),

    updateAgent: build.mutation<any, any>({
      query: body => {
        // console.log(body);
        return {
          url: `${endpoints.updateAgent.url}/${body._id}`,
          method: endpoints.updateAgent.method,
          body: body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['AgentList'],
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
    agentList: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.agentList,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
      providesTags: ['AgentList'],
    }),
    deleteAgent: build.mutation<any, any>({
      query: id => ({
        url: `${endpoints.deleteAgent.url}/${id}`,
        method: endpoints.deleteAgent.method,
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
      invalidatesTags: ['AgentList'],
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
      invalidatesTags: ['AgentList'],
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
      providesTags: ['AgentList'],
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
          url: `${endpoints.newNoteList.url}?pageSize=${params.pageSize}&page=${params.page}&leadId=${params.agentId}`,
          method: endpoints.newNoteList.method,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
      providesTags: ['NoteList'],
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
    sortAgentsList: build.mutation<any, any>({
      query: query => {
        return {
          url: `${endpoints.sortAgentsList.url}?sort=annualVolume&order=${query.order}`,
          method: endpoints.sortAgentsList.method,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
  }),
});

export const useAgentSlice = () => {
  useInjectReducer({ key: api.reducerPath, reducer: api.reducer });
  useInjectReducer({ key: slice.reducerPath, reducer: slice.reducer });

  return {
    actions: slice.actions,
    useAddAgentMutation: api.useAddAgentMutation,
    useUpdateAgentMutation: api.useUpdateAgentMutation,
    useAgentListQuery: api.useLazyAgentListQuery,
    useCampaiganListQuery: api.useLazyCampaiganListQuery,
    useDeleteAgentMutation: api.useDeleteAgentMutation,
    useAddLoanMutation: api.useAddLoanMutation,
    useUpdateLoanMutation: api.useUpdateLoanMutation,
    useLoanListQuery: api.useLazyLoanListQuery,
    useNoteListQuery: api.useLazyNoteListQuery,
    useAddNotesQuery: api.useAddNotesMutation,
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
