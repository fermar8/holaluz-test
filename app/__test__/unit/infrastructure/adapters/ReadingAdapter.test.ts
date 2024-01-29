import fs from 'fs';
import * as xml2js from 'xml2js';
import CsvReadingAdapter from '../../../../infrastructure/adapters/readings/CsvReadingAdapter';
import XmlReadingAdapter from '../../../../infrastructure/adapters/readings/XmlReadingAdapter';

import CsvParseError from '../../../../infrastructure/adapters/readings/errors/CsvParseError';
import XmlParseError from '../../../../infrastructure/adapters/readings/errors/XmlParseError';

jest.mock('fs');
jest.mock('csv-parser');
jest.mock('xml2js');

describe('CsvReadingAdapter', () => {
  describe('#run', () => {
    it('should parse CSV file and return Readings', async () => {
      const expectedReadings = [
        { clientID: 'client1', period: 'period1', reading: 1 },
        { clientID: 'client2', period: 'period2', reading: 2 },
      ];
      const filePath = '/path/to/file';

      const parserStream: any = {
        pipe: jest.fn().mockReturnThis(),
        on: jest.fn().mockImplementation((event, callback) => {
          if (event === 'data') {
            expectedReadings.forEach((reading) =>
              callback({
                client: reading.clientID,
                period: reading.period,
                reading: reading.reading,
              }),
            );
          } else if (event === 'end') {
            callback();
          }
          return parserStream;
        }),
      };

      const readStream = {
        pipe: jest.fn().mockReturnValue(parserStream),
      };

      (fs.createReadStream as jest.Mock).mockReturnValue(readStream);

      const adapter = new CsvReadingAdapter();
      const result = await adapter.run(filePath);

      expect(result).toEqual(expectedReadings);
      expect(fs.createReadStream).toHaveBeenCalledWith(filePath);
    });
    it('should throw CsvParseError when there is an error', async () => {
      const filePath = '/path/to/file';

      const parserStream: any = {
        pipe: jest.fn().mockReturnThis(),
        on: jest.fn().mockImplementation((event, callback) => {
          if (event === 'error') {
            callback(new CsvParseError('Simulated error'));
          }
          return parserStream;
        }),
      };

      const readStream = {
        pipe: jest.fn().mockReturnValue(parserStream),
      };

      (fs.createReadStream as jest.Mock).mockReturnValue(readStream);

      const adapter = new CsvReadingAdapter();

      try {
        await adapter.run(filePath);
      } catch (error) {
        expect(error).toBeInstanceOf(CsvParseError);
      }
    });
  });
});

describe('XmlReadingAdapter', () => {
  describe('#run', () => {
    it('should parse XML file and return Readings', async () => {
      const expectedReadings = [
        { clientID: 'client1', period: 'period1', reading: 1 },
        { clientID: 'client2', period: 'period2', reading: 2 },
      ];
      const filePath = '/path/to/file';
      const xmlData = `<readings><reading clientID="client1" period="period1"><_>1</_></reading><reading clientID="client2" period="period2"><_>2</_></reading></readings>`;

      (fs.readFileSync as jest.Mock).mockReturnValue(xmlData);

      (xml2js.parseString as jest.Mock).mockImplementation((xml, callback) => {
        const result = {
          readings: {
            reading: expectedReadings.map((reading) => ({
              $: { ...reading },
              _: reading.reading,
            })),
          },
        };
        callback(null, result);
      });

      const adapter = new XmlReadingAdapter();
      const result = await adapter.run(filePath);

      expect(result).toEqual(expectedReadings);
      expect(fs.readFileSync).toHaveBeenCalledWith(filePath, 'utf8');
      expect(xml2js.parseString).toHaveBeenCalledWith(
        xmlData,
        expect.any(Function),
      );
    });
    it('should throw XmlParseError when there is an error', async () => {
      const filePath = '/path/to/file';
      const xmlData = `<readings><reading clientID="client1" period="period1"><_>1</_></reading><reading clientID="client2" period="period2"><_>2</_></reading></readings>`;

      (fs.readFileSync as jest.Mock).mockReturnValue(xmlData);

      (xml2js.parseString as jest.Mock).mockImplementation((xml, callback) => {
        callback(new XmlParseError('Simulated error'), null);
      });

      const adapter = new XmlReadingAdapter();

      try {
        await adapter.run(filePath);
      } catch (error) {
        expect(error).toBeInstanceOf(XmlParseError);
      }
    });
  });
});
