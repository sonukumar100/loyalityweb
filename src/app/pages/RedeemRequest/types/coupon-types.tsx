// src/types/coupon.ts

export type Coupon = {
  id: number;
  date: Date;
  createdBy: string;
  type: string;
  title: string;
  CouponCode: string;
  created_at: Date;
  updatedAt: Date;
  productName: string;
  remark: string;
  user: {
    email: string;
  };
  shipped_status: string;
};
