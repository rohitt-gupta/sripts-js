import fs from "fs";
import path from "path";

function parseRedisData(data) {
	const lines = data.split("\n").filter((line) => line.trim() !== "");
	const chats = {};
	let currentChat = null;

	for (let i = 0; i < lines.length; i++) {
		if (lines[i].startsWith("*")) {
			if (currentChat) {
				chats[currentChat.id] = currentChat;
			}
			currentChat = {};
		} else if (lines[i].startsWith("$")) {
			const key = lines[i + 1];
			const value = lines[i + 3];
			currentChat[key] = value;
			i += 3;
		}
	}
	if (currentChat) {
		chats[currentChat.id] = currentChat;
	}

	return chats;
}

function processFile(filePath, outputDir) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, "utf8", (err, data) => {
			if (err) {
				console.error(`Error reading ${filePath}:`, err);
				reject(err);
				return;
			}

			const chats = parseRedisData(data);
			const outputPath = path.join(
				outputDir,
				`${path.basename(filePath, ".json")}_output.json`
			);

			fs.writeFile(
				outputPath,
				JSON.stringify(chats, null, 2),
				"utf8",
				(err) => {
					if (err) {
						console.error(`Error writing to ${outputPath}:`, err);
						reject(err);
						return;
					}
					console.log(`Data successfully written to ${outputPath}`);
					resolve();
				}
			);
		});
	});
}

async function processAllFiles() {
	const filesDir = "files";
	const outputDir = "output";

	// Create output directory if it doesn't exist
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir);
	}

	try {
		const files = await fs.promises.readdir(filesDir);
		const jsonFiles = files.filter(
			(file) => path.extname(file).toLowerCase() === ".json"
		);

		for (const file of jsonFiles) {
			await processFile(path.join(filesDir, file), outputDir);
		}

		console.log("All files processed successfully");
	} catch (err) {
		console.error("Error processing files:", err);
	}
}

processAllFiles();
