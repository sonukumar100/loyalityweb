import { LoginState } from 'app/pages/Login/slice/types';
import { GlobalState } from 'app//slice/types';
import { AddTeamMemberState } from 'app/pages/Admin/slice/types';
import { Edit } from './edit';
import { CouponEdit } from 'app/pages/Coupon/slice/types';
import { RedeemEdit } from 'app/pages/RedeemRequest/slice/types';

// import { State } from 'app/pages\User\AddContact/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  globalApi?: any;
  loginApi?: any;
  offerApi?: any;
  CouponApi?: any;
  signInApi?: any;
  addTeamMemberApi?: any;
  addTeamMember?: AddTeamMemberState;
  global?: GlobalState;
  addNotes: any;
  noteList: any;
  couponEdit: any;
  redeemEdit: any;
  RedeemApi?: any;
  userApi: any;
  chatApi: any;

  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
