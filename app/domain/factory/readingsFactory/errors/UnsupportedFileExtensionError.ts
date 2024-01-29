export default class UnsupportedFileExtensionError extends Error {
  constructor(message?: string) {
    super(message || 'Unsupported file extension');
    this.name = 'UnsupportedFileExtensionError';
  }
}
