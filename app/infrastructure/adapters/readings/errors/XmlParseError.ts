export default class XmlParseError extends Error {
  constructor(message?: string) {
    super(message || 'Failed to parse XML file');
    this.name = 'XmlParseError';
  }
}
