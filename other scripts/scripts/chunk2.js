import fs from "fs";

function extractEmails(data) {
	const emailPattern = /"email"\s*:\s*"\s*([^"]+)\s*"/g;
	const emails = [];
	let match;

	while ((match = emailPattern.exec(data)) !== null) {
		emails.push(match[1]);
	}

	return emails;
}

// Read the input file
fs.readFile("../files/chunk_1.json", "utf8", (err, data) => {
	if (err) {
		console.error("Error reading the file:", err);
		return;
	}

	const emails = extractEmails(data);
	console.log("Emails:", emails);
});
