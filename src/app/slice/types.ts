/* --- STATE --- */
import { DeliveryAmount, JSONValue, Message } from '@twilio/conversations';

export interface GlobalState {
  user: any;
  twilio: { device: any; token: any };
  twilioChat: { token: string; chat: TwilioMessage[] };
  loading: boolean;
  error: any;
  calling: {
    status: 'idle' | 'in-progress' | 'completed' | 'dialing';
    contact: {
      phone: string;
      fullName: string;
      avatar: string;
    };
  };
  newNotifications: {
    isNotifications: boolean,
    isNewLead: boolean,
  };
}
export type TwilioMessage = {
  sid: string;
  index: number;
  body: string | null;
  author: string | null;
  // attributes: JSONValue;
  participantSid: string | null;
  dateCreated: Date | null;
  aggregatedDeliveryReceipt: {
    total: number;
    sent: DeliveryAmount;
    delivered: DeliveryAmount;
    read: DeliveryAmount;
    undelivered: DeliveryAmount;
    failed: DeliveryAmount;
  } | null;
};
