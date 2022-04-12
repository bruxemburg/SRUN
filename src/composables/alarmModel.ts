import alarmsJson from '../alarms.json'

class Alarm {
  id: number
  enabled: boolean
  tags: Tag[]
  settings: Settings
  expiration: number

  constructor(id?: number) {
    if (id && alarmsJson[id]) {
      // TODO: fetch alarm from cache
      this.id = id
      this.enabled = alarmsJson[id].enabled
      this.tags = alarmsJson[id].tags
      this.settings = alarmsJson[id].settings
      this.expiration = alarmsJson[id].expiration
    }
    else {
      this.id = -1
      this.enabled = true
      this.tags = []
      this.settings = new Settings()
      this.expiration = 0
    }
  }
}
class Tag {
  id: string
  label: string

  constructor(id: string, label: string) {
    this.id = id
    this.label = label
  }
}
class Settings {
  general: {
    transport: string
    route: number
    station: number
    alarmtime: number
    label: string
    image: {
      ico: string
      bg: string
    }
  }

  options: {
    repeat: string[]
    snooze: boolean
    snooze_time: number
  }

  sound: {
    enabled: boolean
    file: string
    volume: number
  }

  motion: {
    enabled: boolean
    pattern: {
      id: string
      label: string
    }
    intensity: number
  }

  constructor() {
    this.general = {
      transport: 'bus',
      route: -1,
      station: -1,
      alarmtime: -5,
      label: 'Alarm',
      image: {
        ico: '',
        bg: '',
      },
    }
    this.options = {
      repeat: [],
      snooze: true,
      snooze_time: 5,
    }
    this.sound = {
      enabled: true,
      file: 'sounds/Radar.wav',
      volume: 50,
    }
    this.motion = {
      enabled: true,
      pattern: {
        id: '',
        label: 'Default',
      },
      intensity: 50,
    }
  }
}
export { Alarm, Settings, Tag }
