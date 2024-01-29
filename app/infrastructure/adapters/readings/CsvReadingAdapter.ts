import fs from 'fs';
import csv from 'csv-parser';

import CsvRow from './interface/CsvRow';
import CsvParseError from './errors/CsvParseError';

import Reading from '../../../domain/model/reading/Reading';
import ReadingAdapter from './ReadingAdapter';

export default class CsvReadingAdapter implements ReadingAdapter {
  async run(filePath: string): Promise<Reading[]> {
    const formattedReadings: Reading[] = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row: CsvRow) => {
          const formattedReading = {
            clientID: row['client'],
            period: row['period'],
            reading: Number(row['reading']),
          };
          formattedReadings.push(formattedReading);
        })
        .on('end', () => {
          resolve(formattedReadings);
        })
        .on('error', (err) => {
          reject(new CsvParseError());
        });
    });
  }
}
