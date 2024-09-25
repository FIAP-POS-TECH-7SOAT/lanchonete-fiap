import { INotification } from '@application/domain/orders/application/ports/providers/INotification';
import { NotificationRequest } from '@application/domain/orders/application/ports/providers/dtos/notification-request-dto';

export class FakeNotification implements INotification {
  async notificate({ message }: NotificationRequest): Promise<void> {
    console.log(message);
  }
}
