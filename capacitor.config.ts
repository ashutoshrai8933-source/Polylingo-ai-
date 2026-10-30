import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ai.polylingo.app',
  appName: 'PolyLingo AI',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
