import { RootState } from './store';

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectProfile = (state: RootState) => state.profile.profile;

