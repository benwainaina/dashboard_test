export const UserSliceName = 'user';

export interface IPageMeta {
  /**
   * current page the user is at
   */
  currentPage?: number;

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
}
