export const AppSliceName = 'dashboard';

export type TNotificationType = 'success' | 'error' | undefined;

export interface INotificationData {
  /**
   * the type of notification
   */
  type: TNotificationType;

  /**
   * message to display
   */
  message: string;
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

export interface IApp {
  /**
   * status for whether all the user data is being fetched
   */
  isFetchingUsers: boolean;

  /**
   * status for whether user data is being fetched
   */
  isFetchingUserData: boolean;

  /**
   * list of fetched users
   */
  users: Array<IUserData>;

  /**
   * whether there is any notification information
   */
  notification?: INotificationData;

  /**
   * information about pagination
   */
  page: IPageMeta;
}
