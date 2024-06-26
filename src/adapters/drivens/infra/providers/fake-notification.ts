import { INotification } from "@application/orders/application/ports/providers/INotification";
import { NotificationRequest } from "@application/orders/application/ports/providers/dtos/notification-request-dto";

export class FakeNotification implements INotification {
  async notificate({
    destination,
    message,
    status,
  }: NotificationRequest): Promise<void> {
    console.log(message);
  }
}
