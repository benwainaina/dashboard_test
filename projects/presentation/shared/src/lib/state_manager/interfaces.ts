export const SharedSliceName = 'shared';

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

export interface ISharedSlice {
  /**
   * whether there is any notification information
   */
  notification?: INotificationData;
}
