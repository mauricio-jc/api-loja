import { Injectable } from '@nestjs/common';
import { NotificationsGateway } from 'src/notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(private notificationsGateway: NotificationsGateway) {}

  create(title: string, description: string): void {
    this.notificationsGateway.createNotification(title, description);
  }
}
