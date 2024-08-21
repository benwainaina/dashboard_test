import { HomeSliceName } from '../../../projects/presentation/home/src/state_manager/interfaces';
import { SharedSliceName } from '../../../projects/presentation/shared/src/lib/state_manager/interfaces';
import { UserSliceName } from '../../../projects/presentation/user/src/state_manager/interfaces';
import { IAppSlice } from './interfaces';

export const InitialAppState: IAppSlice = {
  [UserSliceName]: {
    isFetchingUsers: false,
    isFetchingUserData: false,
    users: [],
    pagination: { currentPage: 1 },
  },
  [HomeSliceName]: {},
  [SharedSliceName]: {},
};
