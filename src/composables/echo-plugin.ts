import { registerPlugin } from "@capacitor/core";

export interface EchoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  print(options: { text: string }): Promise<void>;
  ring(): Promise<void>;
  notify(options: { title: string; content: string }): Promise<{ status: boolean }>;
}

const Echo = registerPlugin<EchoPlugin>("Echo");

export default Echo;
