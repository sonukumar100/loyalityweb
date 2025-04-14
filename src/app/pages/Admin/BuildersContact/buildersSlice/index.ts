import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { endpoints, formatErrors, baseQuery } from 'utils/api/endpoints';
import { BuilderEdit } from './types';

export const initialState: BuilderEdit = {
  edit: null,
};
const slice = createSlice({
  name: 'builderEdit',
  initialState,
  reducers: {
    setEditBuilder(state, action: PayloadAction<any>) {
      state.edit = action.payload.data;
    },
  },
});

export const api = createApi({
  reducerPath: 'addBuilders',
  baseQuery,
  tagTypes: ['BuildersList', 'DeleteBuilders', 'NoteList'],
  endpoints: build => ({
    addBuilder: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.addBuilder,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['BuildersList'],
    }),
    updateBuilder: build.mutation<any, any>({
      query: body => {
        return {
          url: `${endpoints.updateBuilder.url}/${body._id}`,
          method: endpoints.updateBuilder.method,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['BuildersList'],
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
    buildersList: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.builderList,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
      providesTags: ['BuildersList'],
    }),
    deleteBuilder: build.mutation<any, any>({
      query: id => ({
        url: `${endpoints.deleteBuilder.url}/${id}`,
        method: endpoints.deleteBuilder.method,
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
      invalidatesTags: ['BuildersList'],
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
      invalidatesTags: ['BuildersList'],
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
      providesTags: ['BuildersList'],
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
          url: `${endpoints.newNoteList.url}?pageSize=${params.pageSize}&page=${params.page}&leadId=${params.builderId}`,
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

export const useBuilderSlice = () => {
  useInjectReducer({ key: api.reducerPath, reducer: api.reducer });
  useInjectReducer({ key: slice.reducerPath, reducer: slice.reducer });

  return {
    actions: slice.actions,
    useAddBuilderMutation: api.useAddBuilderMutation,
    useUpdateBuilderMutation: api.useUpdateBuilderMutation,
    useBuildersListQuery: api.useLazyBuildersListQuery,
    useCampaiganListQuery: api.useLazyCampaiganListQuery,
    useDeleteBuilderMutation: api.useDeleteBuilderMutation,
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
