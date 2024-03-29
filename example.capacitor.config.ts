import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.bruxemburg.srun',
  appName: 'SRUN',
  webDir: 'dist',
  // disable server in order to use build files
  server: {
    // change to current workstation IPv4
    // use ipconfig for Windows (literally last field LAN)
    // use ifconfig for MacOS (literally en0 after inet)
    url: 'http://ipv4:4000',
    cleartext: true
  },
  loggingBehavior: 'production',
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
}

export default config
