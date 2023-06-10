import { Capacitor, CapacitorHttp } from '@capacitor/core'
import {
  Directory,
  Encoding,
  Filesystem,
  type WriteFileResult
} from '@capacitor/filesystem'
import { Network } from '@capacitor/network'
import { type Ref, ref } from 'vue'
import { type Country, type Region, get_country_data } from './world'
import { csv_to_json } from '~/composables/convertors'

const latest_mobility_data_directory = Directory.Library
const latest_mobility_data_path = 'data/latest_mobility_data.txt'

interface MobilityDataRaw {
  mdb_source_id: string
  data_type: string
  entity_type: string
  'location.country_code': string
  'location.subdivision_name': string
  'location.municipality': string
  provider: string
  name: string
  note: string
  static_reference: string
  'urls.direct_download': string
  'urls.authentication_type': string
  'urls.authentication_info': string
  'urls.api_key_parameter_name': string
  'urls.latest': string
  'urls.license': string
  'location.bounding_box.minimum_latitude': string
  'location.bounding_box.maximum_latitude': string
  'location.bounding_box.minimum_longitude': string
  'location.bounding_box.maximum_longitude': string
  'location.bounding_box.extracted_on': string
  status: string
  features: string
}

export interface MobilityData {
  mdb_source_id: number
  data_type: 'gtfs' | 'gtfs-rt'
  entity_type: 'vp' | 'tu' | 'sa' | null
  location: {
    country_code: string
    subdivision_name: string | null
    municipality: string | null
    bounding_box: {
      minimum_latitude: number
      maximum_latitude: number
      minimum_longitude: number
      maximum_longitude: number
      extracted_on: string
    }
  }
  provider: string
  name: string | null
  note: string | null
  static_reference: number[] | null
  urls: {
    direct_download: string | null
    authentication_type: 0 | 1 | 2 | 3 | null
    authentication_info: string | null
    api_key_parameter_name: string | null
    latest: string
    license: string | null
  }
  status: 'active' | 'inactive' | 'deprecated' | 'development' | null
  features:
    | 'fares-v1'
    | 'fares-v2'
    | 'flex-v1'
    | 'flex-v2'
    | 'pathways'
    | 'occupancy'
    | null
}

export interface GTFSSourceInfo {
  link?: string
  extra_link?: string | null
  status?: 'active' | 'inactive' | 'deprecated' | 'development'
}

export interface GTFSAvailableCountry extends Country, GTFSSourceInfo {
  regions: (Region & GTFSSourceInfo)[]
}

// Dynamic latest_mobility_data variable
export const latest_mobility_data: Ref<MobilityData[]> = ref([])
get_latest_mobility_data_from_local_file().then((data) => {
  console.log(`Data from local file: ${data}`)
  latest_mobility_data.value = data
})

async function get_latest_mobility_data_from_local_file(): Promise<
  MobilityData[]
> {
  console.log('Getting latest mobility data from local file')
  const local_file = await Filesystem.readFile({
    path: latest_mobility_data_path,
    directory: latest_mobility_data_directory,
    encoding: Encoding.UTF8
  })
  return JSON.parse(local_file.data)
}

function format_raw_mobility_data_object(
  object: MobilityDataRaw
): MobilityData {
  return {
    mdb_source_id: parseInt(object.mdb_source_id),
    data_type: object.data_type as 'gtfs' | 'gtfs-rt',
    entity_type: object.entity_type
      ? (object.entity_type as 'vp' | 'tu' | 'sa')
      : null,
    location: {
      country_code: object['location.country_code'],
      subdivision_name: object['location.subdivision_name']
        ? object['location.subdivision_name']
        : null,
      municipality: object['location.municipality']
        ? object['location.municipality']
        : null,
      bounding_box: {
        minimum_latitude: parseFloat(
          object['location.bounding_box.minimum_latitude']
        ),
        maximum_latitude: parseFloat(
          object['location.bounding_box.maximum_latitude']
        ),
        minimum_longitude: parseFloat(
          object['location.bounding_box.minimum_longitude']
        ),
        maximum_longitude: parseFloat(
          object['location.bounding_box.maximum_longitude']
        ),
        extracted_on: object['location.bounding_box.extracted_on']
      }
    },
    provider: object.provider,
    name: object.name ? object.name : null,
    note: object.note ? object.note : null,
    static_reference: object.static_reference
      ? JSON.parse(object.static_reference)
      : null,
    urls: {
      direct_download: object['urls.direct_download']
        ? object['urls.direct_download']
        : null,
      authentication_type: object['urls.authentication_type']
        ? (parseInt(object['urls.authentication_type']) as 0 | 1 | 2 | 3)
        : null,
      authentication_info: object['urls.authentication_info']
        ? object['urls.authentication_info']
        : null,
      api_key_parameter_name: object['urls.api_key_parameter_name']
        ? object['urls.api_key_parameter_name']
        : null,
      latest: object['urls.latest'],
      license: object['urls.license'] ? object['urls.license'] : null
    },
    status: object.status
      ? (object.status as 'active' | 'inactive' | 'deprecated' | 'development')
      : null,
    features: object.features
      ? (object.features as
          | 'fares-v1'
          | 'fares-v2'
          | 'flex-v1'
          | 'flex-v2'
          | 'pathways'
          | 'occupancy')
      : null
  }
}

/**
 * @description Fetches the latest MobilityData .csv file containing most of the public GTFS source links and saves it to the device's Library directory
 * @returns A WriteFileResult object
 */
export async function update_latest_mobility_data(): Promise<WriteFileResult> {
  if (Capacitor.getPlatform() === 'web')
    throw new Error('not web implementation yet') // TODO: implement a different logic for web
  const response = await CapacitorHttp.get({
    url: 'https://bit.ly/catalogs-csv'
  })
  if (response.status !== 200 || response.data == null)
    throw new Error('Failed to fetch latest MobilityData .csv file')

  const mobility_data = (csv_to_json(response.data) as MobilityDataRaw[]).map(
    (object) => {
      console.log(`HERE 3 ${JSON.stringify(object)}}`)
      const rnvar = format_raw_mobility_data_object(object)
      console.log(`HERE 4 ${JSON.stringify(rnvar)}}`)
      return rnvar
    }
  )
  latest_mobility_data.value = mobility_data

  console.log(`Latest MobilityData .csv file fetched: ${mobility_data})}`)

  return await Filesystem.writeFile({
    path: latest_mobility_data_path,
    data: JSON.stringify(mobility_data),
    encoding: Encoding.UTF8,
    directory: latest_mobility_data_directory
  })
}

/**
 * @description Fetches the latest MobilityData .csv file containing most of the public GTFS source links and saves it to the device's Library directory if the file is outdated or doesn't exist as soon as the device is connected to the internet
 * @param skip_if_file_exists_for_no_more_than The number of milliseconds after which the file is considered outdated
 * @returns A WriteFileResult object or null in case if the existing file is not outdated
 */
export async function update_latest_mobility_data_on_network(
  skip_if_file_exists_for_no_more_than: number | null = 1000 * 60 * 60 * 24 * 7 // 7 days
): Promise<WriteFileResult | null> {
  if (Capacitor.getPlatform() === 'web')
    throw new Error('not web implementation yet') // TODO: implement a different logic for web
  let write_file_result: WriteFileResult | null = null
  if ((await Network.getStatus()).connected)
    return await update_latest_mobility_data()
  await Network.addListener('networkStatusChange', async (status) => {
    console.log('Network status changed - test', status)
    const latest_mobility_data_file_info = await Filesystem.stat({
      path: latest_mobility_data_path,
      directory: latest_mobility_data_directory
    })
    if (status.connected) {
      write_file_result = await update_latest_mobility_data()
      return Network.removeAllListeners()
    }
    if (
      latest_mobility_data_file_info.size === 0 ||
      skip_if_file_exists_for_no_more_than === null
    )
      return
    const latest_mobility_data_file_is_outdated =
      Date.now() - latest_mobility_data_file_info.mtime >
      skip_if_file_exists_for_no_more_than
    if (!latest_mobility_data_file_is_outdated)
      return Network.removeAllListeners()
  })
  return write_file_result
}

export function get_all_available_countries_and_regions(
  mobility_data_list: MobilityData[]
): GTFSAvailableCountry[] {
  const result: GTFSAvailableCountry[] = []
  const country_alpha2_to_index_map: { [key: string]: number | undefined } = {}

  for (const mobility_data of mobility_data_list) {
    if (mobility_data.data_type !== 'gtfs') continue
    console.log(`Am I here? ${JSON.stringify(mobility_data)}`)

    let country: GTFSAvailableCountry = {} as GTFSAvailableCountry

    let country_index =
      country_alpha2_to_index_map[mobility_data.location.country_code]
    if (country_index !== undefined) country = result[country_index]
    else {
      country = get_country_data(mobility_data.location.country_code)
      country_index = result.length
      country_alpha2_to_index_map[mobility_data.location.country_code] =
        country_index
      result.push(country)
    }

    if (mobility_data.location.subdivision_name === null) {
      result[country_index].link = mobility_data.urls.latest
      result[country_index].extra_link = mobility_data.urls.direct_download
      result[country_index].status = mobility_data.status
        ? mobility_data.status
        : 'active'
    } else {
      for (const region of result[country_index].regions) {
        if (region.name === mobility_data.location.subdivision_name) {
          if (region.link !== undefined) {
            console.error(
              `Duplicate region ${region.name} in country ${result[country_index].name}`
            )
            continue
          }
          region.link = mobility_data.urls.latest
          region.extra_link = mobility_data.urls.direct_download
          region.status = mobility_data.status ? mobility_data.status : 'active'
        }
      }
    }
  }
  console.log(`All available countries and regions: ${result}`)
  return result
}
