import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.cuerpocristo.app',
  appName: 'Cuerpo de Cristo',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    // Para desarrollo: descomentar y usar tu IP local
    // url: 'http://192.168.1.X:3000',
    // cleartext: true,
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    Geolocation: {},
  },
};

export default config;
