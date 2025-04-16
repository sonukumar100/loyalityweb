import { api as LoginApi } from 'app/pages/Login/slice';
import { api as OfferApi } from 'app/pages/Offer/slice';
import { api as addTeamMemberApi } from 'app/pages/Admin/slice';
import { api as addLeads } from 'app/pages/User/AddContacts/slice';
import { api as CouponApi } from 'app/pages/Coupon/slice';
import { api as globalApi } from 'app/slice/index';
import { api as addAgents } from 'app/pages/Admin/AgentsContact/agentSlice';
import { api as addBuilders } from 'app/pages/Admin/BuildersContact/buildersSlice';
import { api as addRecruits } from 'app/pages/Admin/RecruitsContact/recruitsSlice';
export const rtkQueryMiddleware = [
  LoginApi.middleware,
  OfferApi.middleware,
  CouponApi.middleware,
  addTeamMemberApi.middleware,
  addLeads.middleware,
  globalApi.middleware,
  addAgents.middleware,
  addBuilders.middleware,
  addRecruits.middleware,
];
