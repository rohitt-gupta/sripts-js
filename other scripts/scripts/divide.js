import fs from "fs";
import readline from "readline";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the output directory exists
const outputDir = path.join(__dirname, "files");
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir);
}

// Function to split the file into chunks
async function splitFile(filePath, linesPerFile) {
	const fileStream = fs.createReadStream(filePath, { encoding: "utf8" });
	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});

	let fileCount = 0;
	let lineCount = 0;
	let lines = [];

	for await (const line of rl) {
		lines.push(line);
		lineCount++;

		if (lineCount >= linesPerFile) {
			fileCount++;
			const outputFilePath = path.join(outputDir, `chunk_${fileCount}.json`);
			fs.writeFileSync(outputFilePath, lines.join("\n"), "utf8");
			lines = [];
			lineCount = 0;
		}
	}

	// Write any remaining lines to a final chunk
	if (lines.length > 0) {
		fileCount++;
		const outputFilePath = path.join(outputDir, `chunk_${fileCount}.json`);
		fs.writeFileSync(outputFilePath, lines.join("\n"), "utf8");
	}

	console.log(`File split into ${fileCount} chunks.`);
}

// Path to the redis-1.json file
const filePath = path.join(__dirname, "redis.json");

// Split the file into chunks of 1000 lines each
splitFile(filePath, 1000).catch(console.error);


$ upstash-redis-dump -db 0 -host eu1-moving-loon-6379.upstash.io -port 6379 -pass PASSWORD -tls > redis.dump
Database 0: 9 keys dumped


$ upstash-redis-dump -db 0 -host HOIST -port 6379 -pass PASSWORD -tls > redis.dump