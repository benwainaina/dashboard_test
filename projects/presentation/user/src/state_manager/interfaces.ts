import { IDynamicObject } from '../../../shared/src/lib/state_manager/interfaces';

export const UserSliceName = 'user';

export interface IPageMeta {
  /**
   * current page the user is at
   */
  currentPage: number;

  /**
   * total pages
   */
  pages?: number;

  /**
   * results per page
   */
  perPage?: number;
}

export interface IUserData {
  /**
   * unique identifier of the user
   */
  id: number;

  /**
   * email address for the user
   */
  email: string;

  /**
   * first name of user
   */
  firstName: string;

  /**
   * last name of user
   */
  lastName: string;

  /**
   * image for user
   */
  image: string;

  /**
   * the page to which this user belongs at
   */
  pageNum: number;
}

export interface IUserSlice {
  /**
   * status for whether user data is being fetched
   */
  isFetchingUserData: boolean;

  /**
   * list of fetched users
   */
  users: Array<IUserData>;

  /**
   * information about pagination
   */
  pagination: IPageMeta;

  /**
   * status for whether all the user data is being fetched
   */
  isFetchingUsers: boolean;

  /**
   * last fetched at
   */
  ttlLastUserFetch?: Date;

  /**
   * a hard coded value for after how ttl should be invalidated
   * and data on store be used
   *
   * NB: this can be combined with ngrx local storage to be more robust
   */
  ttlTimeOutInSeconds: number;

  /**
   * list of pages which have already been fetched
   */
  fetchedPages: IDynamicObject;

  /**
   * active user data
   */
  activeUserData?: IUserData;
}
