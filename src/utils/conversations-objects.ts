import {
  Conversation,
  Media,
  Message,
  Participant,
  User,
} from '@twilio/conversations';
// import { ReduxConversation } from "./store/reducers/convoReducer";
// import { ReduxMedia, ReduxMessage } from "./store/reducers/messageListReducer";
// import { ReduxParticipant } from "./store/reducers/participantsReducer";
// import { ReduxUser } from "./store/reducers/userReducer";

export const conversationsMap = new Map<string, Conversation>();
export const messagesMap = new Map<string, Message>();
export const usersMap = new Map<string, User>();
export const mediaMap = new Map<string, Media>();
export const participantsMap = new Map<string, Participant>();

const capitalize = (string: string): string =>
  `${string[0].toUpperCase()}${string.substring(1)}`;

const getSdkObject = <T>(
  objectMap: Map<string, T>,
  sid: string,
  type: 'conversation' | 'message' | 'media' | 'participant' | 'user',
): T => {
  const sdkObject = objectMap.get(sid);

  if (!sdkObject) {
    console.log('getSdkObject', objectMap, sid, type);
    throw new Error(`${capitalize(type)} with SID ${sid} was not found.`);
  }

  return sdkObject;
};
export type ReduxConversation = {
  sid: string;
  friendlyName: string | null;
  dateUpdated: Date | null;
  notificationLevel: 'default' | 'muted';
  lastReadMessageIndex: number | null;
  lastMessage?: {
    index?: number;
    dateCreated?: Date;
  };
};
export const getSdkMessageObject = (msg): Message =>
  getSdkObject(messagesMap, "CH61e31cf9c9114f2faa6e0d80a04552d6", msg);


export const getSdkConversationObject = (
  reduxConversation: ReduxConversation,
): Conversation =>
  getSdkObject(
    conversationsMap,
    'CHec6ac4c2e86a4773bb95164541bad00c',
    'conversation',
  );
