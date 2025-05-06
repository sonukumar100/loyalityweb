export type Chat = {
  id: number;
  created_at: Date;
  send_by: string;
  message: string;
  sender_id: number;
  receiver_id: number;
  full_name: string;
  mobile_number: string;
  state: number;
  city: number;
  total_scan_count: number;
  total_scan_value: number;
  last_scan_date: string;
  karigerPoints: number;
  total_redeem_requests: number;
  is_verified: string;
};
