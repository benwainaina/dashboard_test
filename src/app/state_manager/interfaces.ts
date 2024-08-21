import {
  HomeSliceName,
  IHomeSlice,
} from '../../../projects/presentation/home/src/state_manager/interfaces';
import {
  ISharedSlice,
  SharedSliceName,
} from '../../../projects/presentation/shared/src/lib/state_manager/interfaces';
import {
  IUserSlice,
  UserSliceName,
} from '../../../projects/presentation/user/src/state_manager/interfaces';

export interface IAppSlice {
  [UserSliceName]: IUserSlice;
  [SharedSliceName]: ISharedSlice;
  [HomeSliceName]: IHomeSlice;
}
