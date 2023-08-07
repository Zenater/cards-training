import { RootState } from './store';

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRegistration = (state: RootState) => state.auth.isRegistration;
export const selectProfile = (state: RootState) => state.profile.profile;
export const selectPacks = (state: RootState) => state.packs.cardPacks;
export const selectUserId = (state: RootState) => state.profile.profile._id;
export const selectPrivatePacks = (state: RootState) => state.packs.filterForPacks.private;
export const selectError = (state: RootState) => state.app.error;
export const selectСurrentPacksPage = (state: RootState) => state.packs.filterForPacks.page;
export const selectPacksAllPage = (state: RootState) => state.packs.cardPacksTotalCount;
export const selectAmountOfRows = (state: RootState) => state.packs.filterForPacks.pageCount;
export const selectEmail = (state: RootState) => state.forgotPas.email;

