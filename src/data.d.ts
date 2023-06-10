declare module '~/data/world_countries.json' {
  type: string
  data: {
    name: string
    alpha2: string
    alpha3: string
    numeric: string
  }
}

declare module '~/data/world_regions.json' {
  type: string
  keys_type: string
  data: {
    name: string
    code: string
  }
}
