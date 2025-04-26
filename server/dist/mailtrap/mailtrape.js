"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sender = exports.client = void 0;
const mailtrap_1 = require("mailtrap");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Check for the API token in environment variables
//const apiToken = process.env.MAILTRAP_API_TOKEN;
//console.log(apiToken);
/*if (!apiToken) {
  console.error("Error: MAILTRAP_API_TOKEN is not defined in environment variables");
  throw new Error("MAILTRAP_API_TOKEN is not defined in environment variables");
}*/
// Initialize Mailtrap client
exports.client = new mailtrap_1.MailtrapClient({ token: process.env.MailTRAP_API_TOKEN });
// Define sender details
exports.sender = {
    email: "hello@demomailtrap.com", // Ensure this email matches a verified domain in Mailtrap
    name: "Maurya MearnStack",
};
//console.log("Mailtrap client initialized successfully.");
