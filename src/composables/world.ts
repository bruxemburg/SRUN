import world_countries from '~/assets/world_countries.json'
import world_regions from '~/assets/world_regions.json'

type RegionCountryAplha2 = keyof typeof world_regions.data

export interface Country {
  name: string
  alpha2: string
  alpha3: string
  num: string
}

export interface Region {
  name: string
  code: string
}

// Gathers all available country codes to make the type checking process possible
function get_all_avaiable_country_codes() {
  const all_available_country_codes: {
    alpha2: string[]
    alpha3: string[]
    num: string[]
  } = { alpha2: [], alpha3: [], num: [] }

  for (const country of world_countries.data) {
    all_available_country_codes.alpha2.push(country.alpha2)
    all_available_country_codes.alpha3.push(country.alpha3)
    all_available_country_codes.num.push(country.num)
  }

  return all_available_country_codes
}
const all_avaiable_country_codes = get_all_avaiable_country_codes()

// Gathers all available region codes to speed up the rejection process later
function get_all_avaiable_region_codes() {
  const all_available_region_codes: { code: string[]; name: string[] } = {
    code: [],
    name: []
  }

  for (const key in world_regions.data) {
    const country_code = key as RegionCountryAplha2
    for (const region of world_regions.data[country_code]) {
      all_available_region_codes.code.push(`${country_code}-${region.code}`)
      all_available_region_codes.name.push(`${country_code}-${region.name}`)
    }
  }

  return all_available_region_codes
}
const all_avaiable_region_codes = get_all_avaiable_region_codes()

function get_country_info_by_alpha2(alpha2: string): Country {
  // Because it is not possible to declare union types / enums at runtime, I added a check here
  if (!all_avaiable_country_codes.alpha2.includes(alpha2))
    throw new Error(`Invalid country alpha2 code: "${alpha2}"`)

  for (const country of world_countries.data) {
    if (country.alpha2 === alpha2) return country
  }
  throw new Error(`Invalid country alpha2 code: "${alpha2}"`)
}

function get_country_info_by_alpha3(alpha3: string): Country {
  // Because it is not possible to declare union types / enums at runtime, I added a check here
  if (!all_avaiable_country_codes.alpha3.includes(alpha3))
    throw new Error(`Invalid country alpha3 code: "${alpha3}"`)

  for (const country of world_countries.data) {
    if (country.alpha3 === alpha3) return country
  }
  throw new Error(`Invalid country alpha3 code: "${alpha3}"`)
}

function get_country_info_by_numeric(num: string): Country {
  // Because it is not possible to declare union types / enums at runtime, I added a check here
  if (!all_avaiable_country_codes.num.includes(num))
    throw new Error(`Invalid country numeric code: "${num}"`)

  for (const country of world_countries.data) {
    if (country.num === num) return country
  }
  throw new Error(`Invalid country numeric code: "${num}"`)
}

function get_region_info_by_code(
  country_alpha2: RegionCountryAplha2,
  region_code: string
): Region {
  if (
    !all_avaiable_region_codes.code.includes(`${country_alpha2}-${region_code}`)
  )
    throw new Error(`Invalid region code: "${region_code}"`)

  for (const region of world_regions.data[country_alpha2]) {
    if (region.code === region_code) return region
  }
  throw new Error(`Invalid region code: "${region_code}"`)
}

function get_region_info_by_name(
  country_alpha2: RegionCountryAplha2,
  region_name: string
): Region {
  if (
    !all_avaiable_region_codes.name.includes(`${country_alpha2}-${region_name}`)
  )
    throw new Error(`Invalid region name: "${region_name}"`)

  for (const region of world_regions.data[country_alpha2]) {
    if (region.name === region_name) return region
  }
  throw new Error(`Invalid region name: "${region_name}"`)
}

/**
 * Gets information about a region by its code
 * @param country_alpha2 The ISO 3166-1 alpha-2 code of the country the region is located in
 * @param region_code The ISO 3166-2 code of a region (without the country code)
 * @param region_name The name of a region
 * @returns An object containing information about the region and its country
 * @example (country_alpha2: 'US', region_code: 'CA') === (country_alpha2: 'US', region_name: 'California')
 */
export function get_region_data(
  country_alpha2: RegionCountryAplha2,
  region_code?: string,
  region_name?: string
): Region & { country: Country } {
  let region: Region | null = null
  if (region_code) region = get_region_info_by_code(country_alpha2, region_code)
  else if (region_name)
    region = get_region_info_by_name(country_alpha2, region_name)
  else
    throw new Error(
      'No region data provided! Please provide a region code or a region name.'
    )
  return {
    ...region,
    country: get_country_info_by_alpha2(country_alpha2)
  }
}

/**
 * Gets information about a country by one of its codes
 * @param alpha2 A country code (format: ISO 3166-1 alpha-2)
 * @param alpha3 A country code (format: ISO 3166-1 alpha-3)
 * @param numeric A country code (format: ISO 3166-1 numeric)
 * @returns An object containing information about the country and its regions
 * @example (alpha2: 'US') === (alpha3: 'USA') === (numeric: '840')
 */
export function get_country_data(
  alpha2?: string,
  alpha3?: string,
  numeric?: string
): Country & { regions: Region[] } {
  let country: Country | null = null
  if (alpha2) country = get_country_info_by_alpha2(alpha2)
  else if (alpha3) country = get_country_info_by_alpha3(alpha3)
  else if (numeric) country = get_country_info_by_numeric(numeric!)
  else
    throw new Error(
      'No country code provided! Please provide a one of 3 available ids: alpha2, alpha3 or numeric'
    )
  return {
    ...country,
    regions: world_regions.data[country.alpha2 as RegionCountryAplha2]
  }
}

/**
 * Gets information about all the countries and their regions
 * @returns An array of objects containing information about the countries and their regions
 */
export function get_all_countries_data(): (Country & { regions: Region[] })[] {
  return world_countries.data.map((country) => ({
    ...country,
    regions: world_regions.data[country.alpha2 as RegionCountryAplha2]
  }))
}
