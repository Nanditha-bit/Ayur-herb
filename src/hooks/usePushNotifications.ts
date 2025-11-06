import { PushNotifications } from '@capacitor/push-notifications';
import { useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export const usePushNotifications = () => {
  useEffect(() => {
    // Request permission and register
    const initializePushNotifications = async () => {
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        toast({
          title: "Notification Permission",
          description: "Push notification permission was denied.",
        });
        return;
      }

      await PushNotifications.register();
    };

    // Add listeners
    PushNotifications.addListener('registration', (token) => {
      console.log('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error) => {
      console.error('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      toast({
        title: notification.title || 'Notification',
        description: notification.body || '',
      });
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      console.log('Push action performed: ' + JSON.stringify(notification));
    });

    initializePushNotifications();

    return () => {
      PushNotifications.removeAllListeners();
    };
  }, []);

  const sendLocalNotification = async (title: string, body: string) => {
    try {
      await PushNotifications.createChannel({
        id: 'ayur-herb',
        name: 'Ayur-Herb Notifications',
        description: 'Plant identification and information',
        importance: 4,
        visibility: 1
      });

      // Note: Local notifications require additional native code
      toast({
        title,
        description: body,
      });
    } catch (error) {
      console.error('Local notification error:', error);
    }
  };

  return {
    sendLocalNotification
  };
};
