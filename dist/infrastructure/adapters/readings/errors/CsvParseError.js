"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CsvParseError extends Error {
    constructor(message) {
        super(message || 'Failed to parse CSV file');
        this.name = 'CsvParseError';
    }
}
exports.default = CsvParseError;
