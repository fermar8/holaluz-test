export default class CsvParseError extends Error {
  constructor(message?: string) {
    super(message || 'Failed to parse CSV file');
    this.name = 'CsvParseError';
  }
}
