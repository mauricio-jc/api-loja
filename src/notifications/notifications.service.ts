import { Injectable } from '@nestjs/common';
import { NotificationsGateway } from 'src/notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(private notificationsGateway: NotificationsGateway) {}

  create(): void {
    this.notificationsGateway.createNotification();
  }
}
