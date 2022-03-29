import { registerPlugin } from '@capacitor/core'

export interface EchoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>
  print(options: { text: string }): Promise<void>
}

const Echo = registerPlugin<EchoPlugin>('Echo')

export default Echo
