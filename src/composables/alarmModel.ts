import alarmsJson from '../alarms.json'
import routesJson from '../routes.json'
import stationsJson from '../stations.json'
import tagsJson from '../tags.json'
import transportJson from '../transport.json'

class Alarm {
  id: number
  enabled: boolean
  tags: Tag[]
  settings: Settings
  expiration: number

  constructor(id?: number) {
    let alarm
    if (id !== undefined && (alarm = alarmsJson[id])) {
      // TODO: fetch alarm from cache
      this.id = id
      this.enabled = alarm.enabled
      // console.log(alarm.tags)
      this.tags = alarm.tags.map(tag => new Tag(tag))
      this.settings = new Settings(alarm.settings)
      this.expiration = alarm.expiration
    }
    else {
      this.id = -1
      this.enabled = true
      this.tags = [new Tag()]
      this.settings = new Settings()
      this.expiration = 0
    }
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
    if (id !== undefined && (tag = tagsJson.find(tg => tg.id === id))) {
      // console.log('here')
      this.id = id
      this.label = tag.label
    }
    else {
      this.id = 'unkn'
      this.label = 'Unknown'
    }
  }
}
class Settings {
  general: {
    // transport: Transport | string
    route: Route | number
    station: Station | number
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

  constructor(settings?: Settings) {
    if (settings !== undefined) {
      // let tmp: any
      // console.log(settings.general)
      // settings.general.transport = (settings.general.transport instanceof Transport) ? settings.general.transport : new Transport(settings.general.transport)
      settings.general.route = (settings.general.route instanceof Route) ? settings.general.route : new Route(settings.general.route)
      settings.general.station = (settings.general.station instanceof Station) ? settings.general.station : new Station(settings.general.station)
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
    }
    else {
      this.general = {
        // transport: new Transport(),
        route: new Route(),
        station: new Station(),
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

  getAllRoutes(transport?: string): Route[] {
    if (transport) return routesJson.filter(route => route.transport === transport).map(route => new Route(route.id as number))
    return routesJson.map(route => new Route(route.id as number))
  }

  getAllStations(route?: number): Station[] {
    if (route) return stationsJson.filter(station => station.routes.includes(route)).map(station => new Station(station.id as number))
    return stationsJson.map(station => new Station(station.id as number))
  }
}
class Route {
  id: number
  number: string
  label: string
  transport: Transport
  // stations: Station[]

  constructor(id?: number) {
    // TODO: fetch routes
    let route
    if (id !== undefined && (route = routesJson.find(rt => rt.id === id))) {
      this.id = id
      this.label = route.label
      this.transport = new Transport(route.transport as string)
      /* this.stations = route.stations
        .map(station => new Station(station as number)) */
    }
    else {
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
    if (id !== undefined && (transport = transportJson.find(tr => tr.id === id))) {
      this.id = id
      this.label = transport.label
      /* this.routes = transport.routes
        .map(route => new Route(route as number)) */
    }
    else {
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
    if (id !== undefined && (station = stationsJson.find(st => st.id === id))) {
      this.id = id
      this.label = station.label
      this.routes = station.routes.map(route => new Route(route as number))
    }
    else {
      this.id = -1
      this.label = 'Unknown'
      this.routes = [new Route()]
    }
  }
}
export { Alarm, Tag, Settings, Route, Transport, Station }
