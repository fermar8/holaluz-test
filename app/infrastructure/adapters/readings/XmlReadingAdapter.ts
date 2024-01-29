import fs from 'fs';
import * as xml2js from 'xml2js';

import XmlParseResult from './interface/XmlParseResult';
import XmlParseError from './errors/XmlParseError';

import Reading from '../../../domain/model/reading/Reading';
import ReadingAdapter from './ReadingAdapter';

export default class XmlReadingAdapter implements ReadingAdapter {
  async run(filePath: string): Promise<Reading[]> {
    const formattedReadings: Reading[] = [];
    const xmlData = fs.readFileSync(filePath, 'utf8');

    await new Promise<void>((resolve, reject) => {
      xml2js.parseString(xmlData, (err: any, result: XmlParseResult) => {
        if (err) {
          reject(new XmlParseError());
        }

        for (const reading of result.readings.reading) {
          const formattedReading = {
            clientID: reading.$.clientID.toString(),
            period: reading.$.period.toString(),
            reading: Number(reading._),
          };
          formattedReadings.push(formattedReading);
        }

        resolve();
      });
    });

    return formattedReadings;
  }
}
