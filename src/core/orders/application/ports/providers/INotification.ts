import { NotificationRequest } from "./dtos/NotificationRequest";


export interface INotification {
  notificate(payload: NotificationRequest): Promise<void>;
}
