/* eslint-disable no-cond-assign */
// import { ExceptionCode } from '@capacitor/core'
import { Preferences as Storage } from '@capacitor/preferences'

// import alarmsJson from '../alarms.json'
import routesJson from '../routes.json'
import stationsJson from '../stations.json'
import tagsJson from '../tags.json'
import transportJson from '../transport.json'
import iconsJson from '../icons.json'
import backgroundsJson from '../backgrounds.json'

class Alarm {
  id!: number
  enabled!: boolean
  tags!: Tag[]
  settings!: Settings
  expiration!: number

  constructor(id?: number) {
    if (id !== undefined) {
      this.getAlarm(id)
    } else {
      this.id = -1
      this.enabled = true
      this.tags = [new Tag()]
      this.settings = new Settings()
      this.expiration = 0
    }
  }

  async getAlarm(id: number): Promise<Alarm> {
    if (id === -1) return new Alarm()
    const alrm = await Storage.get({ key: 'alarms' }).then((alarms) => {
      // if (!alarms.value) throw new Error('No alarms found')
      if (!alarms.value) return undefined
      // console.log(alarms)
      const alarm = JSON.parse(alarms.value).find((alarm: Alarm) => {
        return alarm.id === id
      })
      // JSON.parse(JSON.stringify()) is used to clone the object, used as a fast fix of vue reactvity
      // TODO: fix it
      //  || (alarm = JSON.parse(JSON.stringify(alarmsJson[id])))
      if (alarm) {
        this.id = id
        this.enabled = alarm.enabled
        // console.log(alarm)
        this.tags = alarm.tags.map((tag: string) => new Tag(tag))
        alarm.settings.general.route = new Route(alarm.settings.general.route)
        alarm.settings.general.station = new Station(
          alarm.settings.general.station
        )
        alarm.settings.general.image.ico = new Icon(
          alarm.settings.general.image.ico
        )
        alarm.settings.general.image.bg = new Background(
          alarm.settings.general.image.bg
        )
        this.settings = new Settings(alarm.settings)
        this.expiration = alarm.expiration
      }
      // JSON.parse(JSON.stringify()) is used to clone the object, used as a fast fix of vue reactvity
      // TODO: fix it
      return JSON.parse(JSON.stringify(this))
    })
    return alrm
  }

  async getAllAlarms(): Promise<Alarm[]> {
    // const asyncMap = alarmsJson.map(async(alarm) => { (alarm as any) = await this.getAlarm(alarm.id); return alarm as Alarm })
    const asyncMap = await Storage.get({ key: 'alarms' }).then((alarms) => {
      if (alarms.value)
        return JSON.parse(alarms.value).map(async (alarm: Alarm) => {
          ;(alarm as any) = await this.getAlarm(alarm.id)
          return alarm as Alarm
        })
    })
    // console.log(asyncMap)
    if (!asyncMap) return []
    const alarms = await Promise.all(asyncMap)
    return alarms
    // return await Promise.all(asyncMap)
  }

  async saveAlarm(alarm: Alarm): Promise<void> {
    const alarmJson = alarm as any
    alarmJson.settings.general.route = alarm.settings.general.route.id
    alarmJson.settings.general.station = alarm.settings.general.station.id
    alarmJson.settings.general.image.ico = alarm.settings.general.image.ico.id
    alarmJson.settings.general.image.bg = alarm.settings.general.image.bg.id

    if (alarmJson.id === -1)
      await this.getNewAlarmId().then((id) => (alarmJson.id = id))

    await Storage.get({ key: 'alarms' }).then(async (val) => {
      let alarms
      alarms =
        val.value && (alarms = JSON.parse(val.value)) && alarms.length > 0
          ? alarms
          : undefined
      // alarms = (val.value && (alarms = JSON.parse(val.value)) && alarms.length > 0) ? alarms : undefined
      // console.log(alarms)
      // return
      let added = false
      if (!alarms) {
        alarms = [alarmJson]
      } else {
        // console.log(alarms)
        for (let i = 0; i < alarms.length; i++)
          if (alarms[i].id === alarmJson.id) {
            alarms[i] = alarmJson
            added = true
            break
          }

        /* if (alarms) {
            alarms = alarms.map((val) => {
              if (val.id === alarmJson.id) {
                // console.log(val)
                added = true
                // return alarmJson
              }
              console.log(val)
              return alarm
            })
          } */
        /* console.log(alarms)
          return */
        if (!added) alarms.push(alarmJson)
        /* console.log(alarms)
          return */
      }
      /* console.log(alarms)
        return */
      if (val.value !== (alarms = JSON.stringify(alarms)))
        await Storage.set({ key: 'alarms', value: alarms })
      // let input = '['; if (alarms.value && alarms.value !== '[]') input = `${alarms.value.substring(0, alarms.value.length - 1)},`; await Storage.set({ key: 'alarms', value: `${input + JSON.stringify(alarmJson)}]` })
    })
  }

  async deleteAlarm(id: number): Promise<void> {
    await Storage.get({ key: 'alarms' }).then(async (alarms) => {
      let input = alarms.value ? alarms.value : ''
      if (input)
        input = JSON.stringify(
          JSON.parse(input).filter((alarm: Alarm) => {
            return alarm.id !== id
          })
        )
      await Storage.set({ key: 'alarms', value: input })
    })
  }

  async getNewAlarmId(): Promise<number> {
    return await Storage.get({ key: 'alarms' }).then((alarms) => {
      let i = 0
      if (alarms.value) {
        const ids = JSON.parse(alarms.value).map((alarm: Alarm) => {
          return alarm.id
        })
        while (ids.includes(i)) i++
      }
      return i
    })
  }

  async toggleAlarm(id: number): Promise<void> {
    await Storage.get({ key: 'alarms' }).then(async (alarms) => {
      let input = alarms.value ? alarms.value : ''
      if (input)
        input = JSON.stringify(
          JSON.parse(input).map((alarm: Alarm) => {
            if (alarm.id === id) alarm.enabled = !alarm.enabled
            return alarm
          })
        )
      await Storage.set({ key: 'alarms', value: input })
    })
  }
}
class Tag {
  id: string
  label: string

  /* constructor(id: string, label: string) {
    this.id = id
    this.label = label
  } */
  constructor(id?: string) {
    let tag
    if (id !== undefined && (tag = tagsJson.find((tg) => tg.id === id))) {
      // console.log('here')
      this.id = id
      this.label = tag.label
    } else {
      this.id = 'unkn'
      this.label = 'Unknown'
    }
  }
}
class Settings {
  general: {
    // transport: Transport | string
    route: Route
    station: Station
    alarmtime: number
    label: string
    image: {
      ico: Icon
      bg: Background
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

  constructor(settings?: Settings) {
    if (settings !== undefined) {
      // let tmp: any
      // console.log(settings.general)
      // settings.general.transport = (settings.general.transport instanceof Transport) ? settings.general.transport : new Transport(settings.general.transport)
      // settings.general.route = (settings.general.route instanceof Route) ? settings.general.route : new Route(settings.general.route)
      // settings.general.station = (settings.general.station instanceof Station) ? settings.general.station : new Station(settings.general.station)
      // console.log((tmp = (settings.general.transport as Transport).routes.find(route => route.id === settings.general.route)))
      /* settings.general.route = (settings.general.route instanceof Route) ? settings.general.route : (tmp = (settings.general.transport as Transport).routes.find(route => route.id === settings.general.route) ? tmp : new Route())
      settings.general.station = (settings.general.station instanceof Station) ? settings.general.station : (tmp = (settings.general.route as Route).stations.find(station => station.id === settings.general.station) ? tmp : new Station()) */
      /* if (!(settings.general.route instanceof Route)) {
        const route: Route | undefined = (settings.general.transport as Transport).routes.find(route => route.id === settings.general.route)
        if (route) settings.general.route = route
        else settings.general.route = new Route()
      } */
      /* if (!(settings.general.station instanceof Station)) {
        const station: Station | undefined = (settings.general.route as Route).stations.find(station => station.id === settings.general.station)
        if (station) settings.general.station = station
        else settings.general.station = new Station()
      } */
      /* this.general = {
        //transport: (settings.general.transport instanceof Transport) ? settings.general.transport : new Transport(settings.general.transport),
        //route: (settings.general.route instanceof Route) ? settings.general.route : new Route(settings.general.route),
        //station: (settings.general.station instanceof Station) ? settings.general.station : new Station(settings.general.station),
        route: (settings.general.route instanceof Route) ? settings.general.route : (tmp = (this.general.transport as Transport).routes.find(route => route.id === settings.general.route) ? tmp : new Route()),
        station: (settings.general.station instanceof Station) ? settings.general.station : (tmp = (this.general.route as Route).stations.find(station => station.id === settings.general.station) ? tmp : new Station()),
        alarmtime: settings.general.alarmtime,
        label: settings.general.label,
        image: {
          ico: settings.general.image.ico,
          bg: settings.general.image.bg,
        },
      } */
      this.general = settings.general
      this.options = settings.options
      this.sound = settings.sound
      this.motion = settings.motion
    } else {
      this.general = {
        // transport: new Transport(),
        route: new Route(),
        station: new Station(),
        alarmtime: -5,
        label: 'Alarm',
        image: {
          ico: new Icon(),
          bg: new Background()
        }
      }
      this.options = {
        repeat: [],
        snooze: true,
        snooze_time: 5
      }
      this.sound = {
        enabled: true,
        file: 'sounds/Radar.wav',
        volume: 50
      }
      this.motion = {
        enabled: true,
        pattern: {
          id: '',
          label: 'Default'
        },
        intensity: 50
      }
    }
  }

  getAllRoutes(transport?: string): Route[] {
    if (transport)
      return routesJson
        .filter((route) => route.transport === transport)
        .map((route) => new Route(route.id as number))
    return routesJson.map((route) => new Route(route.id as number))
  }

  getAllStations(route?: number): Station[] {
    if (route)
      return stationsJson
        .filter((station) => station.routes.includes(route))
        .map((station) => new Station(station.id as number))
    return stationsJson.map((station) => new Station(station.id as number))
  }
}
class Route {
  id: number
  number!: string
  label: string
  transport: Transport
  // stations: Station[]

  constructor(id?: number) {
    // TODO: fetch routes
    let route
    if (id !== undefined && (route = routesJson.find((rt) => rt.id === id))) {
      this.id = id
      this.label = route.label
      this.transport = new Transport(route.transport as string)
      /* this.stations = route.stations
        .map(station => new Station(station as number)) */
    } else {
      this.id = -1
      this.label = 'Unknown'
      this.transport = new Transport()
      // this.stations = [new Station()]
    }
  }
}
class Transport {
  id: string
  label: string
  // routes: Route[]

  constructor(id?: string) {
    let transport
    if (
      id !== undefined &&
      (transport = transportJson.find((tr) => tr.id === id))
    ) {
      this.id = id
      this.label = transport.label
      /* this.routes = transport.routes
        .map(route => new Route(route as number)) */
    } else {
      this.id = 'unkn'
      this.label = 'Unknown'
      // this.routes = [new Route()]
    }
  }
}
class Station {
  id: number
  label: string
  routes: Route[]

  constructor(id?: number) {
    // TODO: fetch stations
    let station
    if (
      id !== undefined &&
      (station = stationsJson.find((st) => st.id === id))
    ) {
      this.id = id
      this.label = station.label
      this.routes = station.routes.map((route) => new Route(route as number))
    } else {
      this.id = -1
      this.label = 'Unknown'
      this.routes = [new Route()]
    }
  }
}
class Icon {
  id: number
  file: string

  constructor(id?: number) {
    let icon
    if (id !== undefined && (icon = iconsJson.find((ic) => ic.id === id))) {
      this.id = id
      this.file = icon.file
    } else {
      // temp
      const rId = Math.floor(Math.random() * backgroundsJson.length)
      this.id = iconsJson[rId].id
      this.file = iconsJson[rId].file
    }
  }
}
class Background {
  id: number
  color: string

  constructor(id?: number) {
    let bg
    if (id !== undefined && (bg = backgroundsJson.find((bg) => bg.id === id))) {
      this.id = id
      this.color = bg.color
    } else {
      // temp
      const rId = Math.floor(Math.random() * backgroundsJson.length)
      this.id = backgroundsJson[rId].id
      this.color = backgroundsJson[rId].color
    }
  }
}
export { Alarm, Tag, Settings, Route, Transport, Station }
