import fs from "fs";
import { scranton, newData } from "../export.js";

// Update scranton metadata.id with newData id by comparing the email
scranton.forEach((item) => {
	const newItem = newData.find(
		(newItem) => newItem.email === item.metadata.email
	);
	if (newItem) {
		item.metadata.id = newItem.id;
		item.id = newItem.id;
		item.chats.map((chat) => {
			chat.userId = newItem.id;
		});
	}
});

// Save the updated scranton array to a new output.json file
fs.writeFileSync("output.json", JSON.stringify(scranton, null, 2), "utf-8");

console.log("Updated scranton metadata.id and saved to output.json");
