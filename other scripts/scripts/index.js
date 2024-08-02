import fs from "fs";

// Read the chunk_1.json file
fs.readFile("../files/chunk_10.json", "utf8", (err, data) => {
	if (err) {
		console.error("Error reading chunk_1.json:", err);
		return;
	}

	// Split the data by lines and filter out empty lines
	const lines = data.split("\n").filter((line) => line.trim() !== "");

	// Initialize an empty object to store the parsed chats
	const chats = {};

	// Iterate over the lines and parse the Redis data
	let currentChat = null;
	for (let i = 0; i < lines.length; i++) {
		if (lines[i].startsWith("*")) {
			// New chat entry
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

	console.log(chats);

	// Write the parsed JSON to output.json
	fs.writeFile(
		"../output/chunk_10.json",
		JSON.stringify(chats, null, 2),
		"utf8",
		(err) => {
			if (err) {
				console.error("Error writing to output.json:", err);
				return;
			}
			console.log("Data successfully written to output.json");
		}
	);
});
