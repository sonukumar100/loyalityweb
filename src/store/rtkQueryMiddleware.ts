import { api as LoginApi } from 'app/pages/Login/slice';
import { api as OfferApi } from 'app/pages/Offer/slice';
import { api as addTeamMemberApi } from 'app/pages/Admin/slice';
import { api as CouponApi } from 'app/pages/Coupon/slice';
import { api as globalApi } from 'app/slice/index';
import { api as RedeemApi } from 'app/pages/RedeemRequest/slice';
import { api as UserApi } from 'app/pages/kariger/slice';
import { api as ChatApi } from 'app/pages/Chat/slice';
import { User } from 'lucide-react';
export const rtkQueryMiddleware = [
  LoginApi.middleware,
  OfferApi.middleware,
  CouponApi.middleware,
  addTeamMemberApi.middleware,
  globalApi.middleware,
  RedeemApi.middleware,
  UserApi.middleware,
  ChatApi.middleware,
];
