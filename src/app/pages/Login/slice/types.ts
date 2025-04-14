/* --- STATE --- */
export interface LoginState {
  loading: boolean;
  error: null | string;
  user: null | any;
  isLoggedIn: boolean;
}
