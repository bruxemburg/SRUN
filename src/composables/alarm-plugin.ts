import { registerPlugin } from '@capacitor/core'

export interface AlarmPlugin {
  set(options: { hours: number; minutes: number }): Promise<{ status: boolean }>
}

const Alarm = registerPlugin<AlarmPlugin>('Alarm')

export default Alarm
