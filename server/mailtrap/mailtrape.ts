import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Check for the API token in environment variables
//const apiToken = process.env.MAILTRAP_API_TOKEN;
//console.log(apiToken);

/*if (!apiToken) {
  console.error("Error: MAILTRAP_API_TOKEN is not defined in environment variables");
  throw new Error("MAILTRAP_API_TOKEN is not defined in environment variables");
}*/

// Initialize Mailtrap client
export const client = new MailtrapClient({ token: process.env.MailTRAP_API_TOKEN!});

// Define sender details
export const sender = {
  email: "hello@demomailtrap.com", // Ensure this email matches a verified domain in Mailtrap
  name: "Maurya MearnStack",
};

//console.log("Mailtrap client initialized successfully.");
