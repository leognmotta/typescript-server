"use strict";Object.defineProperty(exports, "__esModule", {value: true}); class ApiError extends Error {
  
   constructor (name, statusCode, message) {
    super(message)
    this.name = name
    this.statusCode = statusCode
  }
} exports.default = ApiError;
