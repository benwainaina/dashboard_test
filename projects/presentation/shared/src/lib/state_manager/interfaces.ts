export const SharedSliceName = 'shared';

export type TNotificationType = 'success' | 'error' | undefined;

export type TPreviewPlacement = 'a' | 'b' | 'c' | 'd';

export interface IPreviewPosition {
  hostX: number;
  hostY: number;
  hostCenterX: number;
  hostCenterY: number;
  zone: TPreviewPlacement;
}

export interface IListDisplayItem {
  /**
   * input to be projected into the component
   */
  componentInput: any;

  /**
   * component to be rendered
   */
  componentRef: any;
}

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
