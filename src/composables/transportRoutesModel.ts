class TransportRoutes {
  transport: Transport
  routes: Route[]

  constructor(transport?: string) {
    this.transport = new Transport(transport)
    this.routes = this.getRoutes()
  }

  getRoutes(): Route[] {
    // TODO: fetch routes
    return [new Route(-1, 'Route -1', [new Station(-1, 'Station -1')])]
  }
}
class Route {
  id: number
  label: string
  stations: Station[]

  constructor(id: number, label: string, stations: Station[]) {
    this.id = id
    this.label = label
    this.stations = stations
  }
}
class Transport {
  id: string
  label: string

  constructor(transport?: string) {
    if (transport) this.id = transport
    else this.id = 'car'

    if (this.id === 'car') this.label = 'Car'
    else if (this.id === 'bus') this.label = 'Bus'
    else if (this.id === 'trn') this.label = 'Train'
    else if (this.id === 'trm') this.label = 'Tram'
    else this.label = 'Unknown'
  }
}
class Station {
  id: number
  label: string

  constructor(id: number, label: string) {
    this.id = id
    this.label = label
  }
}
export { TransportRoutes, Transport }
