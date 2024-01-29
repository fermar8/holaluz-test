"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnsupportedFileExtensionError extends Error {
    constructor(message) {
        super(message || 'Unsupported file extension');
        this.name = 'UnsupportedFileExtensionError';
    }
}
exports.default = UnsupportedFileExtensionError;
