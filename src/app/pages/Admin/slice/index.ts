import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { AddTeamMemberState } from './types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { endpoints, formatErrors, baseQuery } from 'utils/api/endpoints';
import { use } from 'i18next';
export const initialState: AddTeamMemberState = {
  edit: null,
};

const slice = createSlice({
  name: 'addTeamMember',
  initialState,
  reducers: {
    setEdit(state, action: PayloadAction<any>) {
      state.edit = action.payload.data;
    },
  },
});

// export const initialState: AddTeamMemberState = {
//   loading: false,
//   error: null,
//   teamRes: null,
//   // isLoggedIn: false,
// };

// export const { actions: Actions } = slice;

// export const useSlice = () => {
//   useInjectReducer({ key: slice.name, reducer: slice.reducer });
//   useInjectSaga({ key: slice.name, saga: Saga });
//   return { actions: slice.actions };
// };

export const api = createApi({
  reducerPath: 'addTeamMemberApi',
  baseQuery,
  tagTypes: [
    'Admin',
    'Role',
    'Location',
    'Status',
    'AddPoints',
    'AddCatalog',
    'AddGiftGallery',
  ],
  endpoints: build => ({
    addBrandPoints: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.addBrandPoints,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
      invalidatesTags: ['AddPoints'],
    }),
    getBrandPoints: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.getBrandPoints,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
      providesTags: ['AddPoints'],
    }),
    addDailyLimit: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.dailyAccessLimit,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
      invalidatesTags: ['Admin'],
    }),
    deleteBrand: build.mutation<any, any>({
      query: id => ({
        url: `${endpoints.deleteBrand.url}/${id}`,
        method: endpoints.deleteBrand.method,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    addVideo: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.addVideo,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
    }),
    getVideo: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.getVideo,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
    }),

    addCataLog: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.addDigitalCatalog,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
      invalidatesTags: ['AddCatalog'],
    }),
    getCatalog: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.getDigitalCatalog,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
      providesTags: ['AddCatalog'],
    }),
    offerList: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.offerList,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
    }),
    addGiftGallery: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.addGiftGallery,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
      invalidatesTags: ['AddGiftGallery'],
    }),
    getGiftGallery: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.getGiftGallery,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
    }),
    deleteGiftGallery: build.mutation<any, any>({
      query: id => ({
        url: `${endpoints.deleteGiftGallery.url}/${id}`,
        method: endpoints.deleteGiftGallery.method,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),

    uploadFile: build.mutation<any, any>({
      query: (body: FormData) => ({
        ...endpoints.uploadFile,
        body,
      }),
    }),
    addTeamMember: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.addTeamMember,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
      invalidatesTags: ['Admin'],
    }),
    updateTeamMember: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.updateTeamMember,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
      invalidatesTags: ['Admin'],
    }),
    updateProfile: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.updateProfile,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
    }),
    admin: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.adminUserList,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
      // providesTags: (result, error, admin) => [{ type: 'Admin', admin }],
      // providesTags: (result) => {
      //   console.log('Query result:', result);

      //   const tags = result ? result?.data?.documents?.map(({ search }) => ({ type: 'Posts', search })) : [];
      //   console.log('Provided tags:', tags);
      //   return tags;
      // },
      providesTags: ['Admin'],
    }),
    status: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.status,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
      invalidatesTags: ['Admin'],
    }),
    role: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.role,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
    }),
    locations: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.locations,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
    }),
  }),
});

export const useAdminSlice = () => {
  useInjectReducer({ key: api.reducerPath, reducer: api.reducer });
  useInjectReducer({ key: slice.reducerPath, reducer: slice.reducer });
  return {
    actions: slice.actions,
    useUploadFileMutation: api.useUploadFileMutation,
    useAddTeamMemberMutation: api.useAddTeamMemberMutation,
    useUpdateTeamMemberMutation: api.useUpdateTeamMemberMutation,
    useUpdateProfileMutation: api.useUpdateProfileMutation,
    useAdminUserListQuery: api.useLazyAdminQuery,
    useRoleUserListQuery: api.useLazyRoleQuery,
    useLocationsUserListQuery: api.useLazyLocationsQuery,
    useStatusMutation: api.useStatusMutation,
    useAddBrandPointsMutation: api.useAddBrandPointsMutation,
    useAddDailyLimitMutation: api.useAddDailyLimitMutation,
    useGetPointsLazyQuery: api.useLazyGetBrandPointsQuery,
    useDeleteBrandMutation: api.useDeleteBrandMutation,
    useGetVideoLazyQuery: api.useLazyGetVideoQuery,
    useAddVideoMutation: api.useAddVideoMutation,
    useGetCatalogLazyQuery: api.useLazyGetCatalogQuery,
    useAddCatalogMutation: api.useAddCataLogMutation,
    useOfferListLazyQuery: api.useLazyOfferListQuery,
    useAddGiftGalleryMutation: api.useAddGiftGalleryMutation,
    useGetGiftGalleryLazyQuery: api.useLazyGetGiftGalleryQuery,
    useDeleteGiftGalleryMutation: api.useDeleteGiftGalleryMutation,
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
