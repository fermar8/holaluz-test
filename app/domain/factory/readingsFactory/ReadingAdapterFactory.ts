import ReadingAdapter from '../../../infrastructure/adapters/readings/ReadingAdapter';
import XmlReadingAdapter from '../../../infrastructure/adapters/readings/XmlReadingAdapter';
import CsvReadingAdapter from '../../../infrastructure/adapters/readings/CsvReadingAdapter';
import UnsupportedFileExtensionError from './errors/UnsupportedFileExtensionError';

interface AdapterMap {
  [key: string]: new () => ReadingAdapter;
}

const adapterMap: AdapterMap = {
  '.xml': XmlReadingAdapter,
  '.csv': CsvReadingAdapter,
};

export default class ReadingAdapterFactory {
  static run(extension: string): ReadingAdapter {
    const AdapterClass = adapterMap[extension];
    if (!AdapterClass) {
      throw new UnsupportedFileExtensionError(
        `Unsupported file extension: ${extension}`,
      );
    }
    return new AdapterClass();
  }
}
