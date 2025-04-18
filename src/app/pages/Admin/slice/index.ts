import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { AddTeamMemberState } from './types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints, formatErrors, baseQuery } from 'utils/api/endpoints';

export const initialState: AddTeamMemberState = {
  edit: null,
  editGift: null,
};

const slice = createSlice({
  name: 'addTeamMember',
  initialState,
  reducers: {
    setEdit(state, action: PayloadAction<any>) {
      state.edit = action.payload.data;
    },
    setEditGift(state, action: PayloadAction<any>) {
      state.editGift = action.payload.data;
    },
  },
});

export const api = createApi({
  reducerPath: 'addTeamMemberApi',
  baseQuery,
  tagTypes: [
    'Admin',
    'Role',
    'Location',
    'Status',
    'AddBrandPoints',
    'AddCatalog',
    'AddGiftGallery',
    'UpdateGiftGallery',
    'DeleteGiftGallery',
  ],
  endpoints: build => ({
    addBrandPoints: build.mutation<any, any>({
      query: body => ({
        ...endpoints.addBrandPoints,
        body,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
      invalidatesTags: ['AddBrandPoints'],
    }),

    getBrandPoints: build.query<any, any>({
      query: params => ({
        ...endpoints.getBrandPoints,
        params,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
      providesTags: ['AddBrandPoints'],
    }),

    updateDailyLimit: build.mutation<any, any>({
      query: body => ({
        ...endpoints.dailyAccessLimit,
        body,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
    }),

    getDailyAccessLimit: build.query<any, any>({
      query: params => ({
        ...endpoints.getDailyAccessLimit,
        params,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
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
      query: body => ({
        ...endpoints.addVideo,
        body,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
    }),

    getVideo: build.query<any, any>({
      query: params => ({
        ...endpoints.getVideo,
        params,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
    }),

    addCataLog: build.mutation<any, any>({
      query: body => ({
        ...endpoints.addDigitalCatalog,
        body,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
      invalidatesTags: ['AddCatalog'],
    }),

    getCatalog: build.query<any, any>({
      query: params => ({
        ...endpoints.getDigitalCatalog,
        params,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
      providesTags: ['AddCatalog'],
    }),

    offerList: build.query<any, any>({
      query: params => ({
        ...endpoints.offerList,
        params,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
    }),

    addGiftGallery: build.mutation<any, any>({
      query: body => ({
        ...endpoints.addGiftGallery,
        body,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
      invalidatesTags: ['AddGiftGallery'],
    }),

    getGiftGallery: build.query<any, any>({
      query: params => ({
        ...endpoints.getGiftGallery,
        params,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
      providesTags: [
        'AddGiftGallery',
        'UpdateGiftGallery',
        'DeleteGiftGallery',
      ],
    }),
    updateGiftGallery: build.mutation<any, any>({
      query: body => ({
        ...endpoints.updateGiftGallery,
        body,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue?.data);
      },
      invalidatesTags: ['UpdateGiftGallery'],
    }),

    deleteGiftGallery: build.mutation<any, any>({
      query: id => ({
        url: `${endpoints.deleteGiftGallery.url}/${id}`,
        method: endpoints.deleteGiftGallery.method,
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
      invalidatesTags: ['DeleteGiftGallery'],
    }),
  }),
});

export const useAdminSlice = () => {
  useInjectReducer({ key: api.reducerPath, reducer: api.reducer });
  useInjectReducer({ key: slice.reducerPath, reducer: slice.reducer });

  return {
    actions: slice.actions,
    useAddBrandPointsMutation: api.useAddBrandPointsMutation,
    useUpdateDailyLimitMutation: api.useUpdateDailyLimitMutation,
    useGetDailyAccessLimitLazyQuery: api.useLazyGetDailyAccessLimitQuery,
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
    useUpdateGiftGalleryMutation: api.useUpdateGiftGalleryMutation,
  };
};
