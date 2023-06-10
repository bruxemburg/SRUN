// /**
//  * @description Converts .csv text to .json format
//  * @param csv Text of the .csv file
//  */
// export function csv_to_json(csv: string) {
//   const lines = csv.split('\n')
//   const result = []
//   const headers = lines[0].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)

//   for (let i = 1; i < lines.length; i++) {
//     const obj: { [index: string]: any } = {}
//     const row = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
//     for (let j = 0; j < headers.length; j++) {
//       obj[headers[j]] = row[j]
//     }
//     result.push(obj)
//   }

//   return result
// }

/**
 * @description Converts .csv text to .json format
 * @param csv Text of the .csv file
 */
export function csv_to_json(csv: string): any[] {
  const rows = csv.split('\n')
  const headers = rows[0].split(',')
  const jsonArray = []

  let currentRow = ''
  let currentRowNumber = 1

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].trim()

    if (currentRow !== '') {
      currentRow += '\n'
    }

    currentRow += row

    if (currentRow.match(/"[^"]*(?:""[^"]*)*"$/)) {
      const fields = currentRow.match(/("[^"]*(?:""[^"]*)*"|[^,]*)/g)
      const jsonObject: any = {}

      for (let j = 0; j < headers.length; j++) {
        const header = headers[j]
        const value = fields![j].replace(/^"(.*)"$/, '$1')
        jsonObject[header] = value
      }

      jsonArray.push(jsonObject)
      currentRow = ''
    } else {
      currentRowNumber++
    }
  }

  if (currentRow !== '') {
    console.error(
      `Error: CSV file ended unexpectedly on line ${currentRowNumber}`
    )
  }

  return jsonArray
}
