import { NotificationProvider } from '@ss/ui/components/notification-provider';
import { NotificationType } from '@ss/ui/components/notification-provider.models';
import '@ss/ui/components/notification-provider';

let notificationProvider: NotificationProvider | null = null;

export function addToast(
  message: string,
  type: NotificationType = NotificationType.INFO,
) {
  if (!notificationProvider) {
    notificationProvider = document.createElement(
      'notification-provider',
    ) as NotificationProvider;
    document.body.appendChild(notificationProvider);
  }

  notificationProvider.addNotification(message, type);
}

export async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
