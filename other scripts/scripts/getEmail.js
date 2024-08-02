import fs from "fs";

// Read the file content
const filePath = "c:\\Users\\Mroads\\OneDrive\\Documents\\Desktop\\export.js";
const fileContent = fs.readFileSync(filePath, "utf-8");

// Regular expression to match email addresses
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// Find all matches
const emails = fileContent.match(emailRegex);

// Remove duplicates
const uniqueEmails = [...new Set(emails)];

// Print the emails
console.log(uniqueEmails);
