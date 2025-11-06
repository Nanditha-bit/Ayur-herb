import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.3ffa6a210b104a7293dea916930cbc01',
  appName: 'plant-gyan-offline',
  webDir: 'dist',
  server: {
    url: 'https://3ffa6a21-0b10-4a72-93de-a916930cbc01.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  }
};

export default config;
