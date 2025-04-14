import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { GlobalState, TwilioMessage } from './types';
import { api as loginApi } from 'app/pages/Login/slice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { endpoints, formatErrors, baseQuery } from 'utils/api/endpoints';
import { DeliveryAmount, JSONValue, Message } from '@twilio/conversations';
import { messagesMap, mediaMap } from 'utils/conversations-objects';

export type ReduxMessage = {
  sid: string;
  index: number;
  body: string | null;
  author: string | null;
  // attributes: JSONValue;
  participantSid: string | null;
  dateCreated: Date | null;
  // attachedMedia: ReduxMedia[] | null;
  aggregatedDeliveryReceipt: {
    total: number;
    sent: DeliveryAmount;
    delivered: DeliveryAmount;
    read: DeliveryAmount;
    undelivered: DeliveryAmount;
    failed: DeliveryAmount;
  } | null;
};
export type ChatMessagesState = Record<string, ReduxMessage[]>;
const reduxifyMessage = (message: Message | ReduxMessage): ReduxMessage => ({
  sid: message.sid,
  index: message.index,
  body: message.body,
  author: message.author,
  participantSid: message.participantSid,
  // attributes: message.attributes,
  dateCreated: message.dateCreated,
  aggregatedDeliveryReceipt: message.aggregatedDeliveryReceipt
    ? {
      total: message.aggregatedDeliveryReceipt.total,
      sent: message.aggregatedDeliveryReceipt.sent,
      delivered: message.aggregatedDeliveryReceipt.delivered,
      read: message.aggregatedDeliveryReceipt.read,
      undelivered: message.aggregatedDeliveryReceipt.undelivered,
      failed: message.aggregatedDeliveryReceipt.failed,
    }
    : null,
  // attachedMedia:
  //   message.attachedMedia?.map((el) => ({
  //     sid: el.sid,
  //     filename: el.filename,
  //     contentType: el.contentType,
  //     size: el.size,
  //     category: el.category,
  //   })) ?? null,
});
export const initialState: GlobalState = {
  user: JSON.parse(localStorage.getItem('user') || 'null') || null,
  // user: null,
  twilio: { device: null, token: null },
  loading: false,
  error: null,
  twilioChat: { token: '', chat: [] },
  newNotifications: {
    isNotifications: false,
    isNewLead: false
  },
  calling: {
    status: 'idle',
    contact: {
      phone: '',
      fullName: '',
      avatar: '',
    },
  },
};

const slice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    setTwilio(state, action: PayloadAction<any>) {
      state.twilio = action.payload;
    },
    setCalling(state, action: PayloadAction<any>) {
      state.calling = action.payload;
    },
    setTwilioChat(state, action: PayloadAction<any>) {
      state.twilioChat = action.payload;
    },

    setNewNotifications(state, action: PayloadAction<any>) {
      state.newNotifications = action.payload;
    },
    pushTwilioChat(state, action: PayloadAction<any>) {
      const { messages } = action.payload;
      state.twilioChat.chat = messages.map(reduxifyMessage);
    },

    // pushTwilioChat(state, action: PayloadAction<any>) {
    //   const { channelSid, messages: messagesToAdd } = action.payload;
    //   const existingMessages = state[channelSid] ?? [];

    //   for (const message of messagesToAdd) {
    //     messagesMap.set(message.sid, message);
    //     // if (message.attachedMedia) {
    //     //   message.attachedMedia.forEach((media) => {
    //     //     mediaMap.set(media.sid, media);
    //     //   });
    //     // }
    //   }

    //   return Object.assign({}, state, {
    //     [channelSid]: existingMessages.concat(
    //       messagesToAdd.map(reduxifyMessage)
    //     ),
    //   }) as unknown as TwilioMessage[];

    // }
  },
  extraReducers: builder => {
    builder.addMatcher(
      loginApi.endpoints.verifyOtp.matchFulfilled,
      (state, action) => {
        console.log(
          state,
          action,
          'loginApi.endpoints.verifyOtp.matchFulfilled',
        );
        localStorage.setItem('user', JSON.stringify(action.payload));
        state.user = action.payload || null;
      },
    );
  },
});

export const api = createApi({
  reducerPath: 'globalApi',
  baseQuery,
  // tagTypes: ['LeadList', 'DeleteLead', 'TwilioVoiceToken'],
  endpoints: build => ({
    twilioVoiceToken: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.getTwilioVoiceToken,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
      // providesTags: ['TwilioVoiceToken'],
    }),
    polling: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.polling,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
    }),
    accepetRejectLead: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.accepetRejectLead,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    getNotifications: build.query<any, any>({
      query: id => {
        return {
          url: `${endpoints.getNotifications.url}/${id}`,
          method: endpoints.getNotifications.method,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
    }),
    updateNotification: build.mutation<any, any>({
      query: body => {
        return {
          url: endpoints.patchNotification.url,
          method: endpoints.patchNotification.method,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
    }),
    chatTwilioToken: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.chatTwilioToken,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue);
      },
    }),
  }),
});

export const { actions: globalActions } = slice;

export const useGlobalSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectReducer({ key: api.reducerPath, reducer: api.reducer });
  return {
    actions: slice.actions,
    ...api,
    useGetNotificationsQuery: api.useLazyGetNotificationsQuery,
    useUpdateNotificationMutation: api.useUpdateNotificationMutation,
  };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useGlobalSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
