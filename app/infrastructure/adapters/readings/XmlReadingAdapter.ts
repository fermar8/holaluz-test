import fs from 'fs';
import * as xml2js from 'xml2js';

import Reading from '../../../domain/model/reading/Reading';
import ReadingAdapter from './ReadingAdapter';

export default class XmlReadingAdapter implements ReadingAdapter {
  async run(filePath: string): Promise<Reading[]> {
    const formattedReadings: Reading[] = [];
    const xmlData = fs.readFileSync(filePath, 'utf8');

    xml2js.parseString(xmlData, (err: any, result: any) => {
      if (err) {
        throw err;
      }

      for (const reading of result.readings.reading) {
        const formattedReading = {
          clientID: reading.$.clientID.toString(),
          period: reading.$.period.toString(),
          reading: Number(reading._),
        };
        formattedReadings.push(formattedReading);
      }
    });

    return formattedReadings;
  }
}
