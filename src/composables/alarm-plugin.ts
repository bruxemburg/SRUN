import { registerPlugin } from '@capacitor/core'

export interface AlarmPlugin {
  set(options: { date: number; name: string }): Promise<{ status: boolean }>
  checkAndRequestPermissions(): Promise<void>
}

const Alarm = registerPlugin<AlarmPlugin>('Alarm')

export default Alarm
