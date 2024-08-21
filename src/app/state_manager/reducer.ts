import { combineReducers } from '@ngrx/store';
import { UserSliceName } from '../../../projects/presentation/user/src/state_manager/interfaces';
import { userReducer } from '../../../projects/presentation/user/src/state_manager/reducers';
import { SharedSliceName } from '../../../projects/presentation/shared/src/lib/state_manager/interfaces';

export const rootReducer = combineReducers({
  [UserSliceName]: userReducer,
});
