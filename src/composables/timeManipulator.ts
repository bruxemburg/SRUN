// TODO: this
class getTime {
  time: string | number;
  base?: string[];
  constructor(time: string | number, base?: string[]) {
    this.time = time;
    this.base = base;
  }
}

export { getTime };
