import { IApp } from './interfaces';

export const InitialAppState: IApp = {
  isFetchingUsers: false,
  isFetchingUserData: false,
  users: [],
  page: { currentPage: 1 },
};
