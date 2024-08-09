import axios from "axios";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const OPENAI_API_KEY =
const OPENAI_ASSISTANT_ID = 

const headers = {
	Authorization: `Bearer ${OPENAI_API_KEY}`,
	"OpenAI-Beta": "assistants=v2",
	"Content-Type": "application/json",
};

// const openai = new OpenAI({
// 	apiKey: OPENAI_API_KEY,
// });

function transformData(data) {
	const finalData = [];
	for (const individualThread of data) {
		const singleThread = individualThread.map((message) => ({
			id: message.thread_id,
			title:
				message.content.length > 0
					? message?.content[0]?.text?.value.substring(0, 100)
					: "",
			created_at: new Date(message?.created_at * 1000), // Convert Unix
		}));
		finalData.push(singleThread);
	}

	return finalData;
}

async function main() {
	// console.log(threadMessages2);
	const transformedData = transformData(threadMessages2);
	const simplifiedData = transformedData.map((thread) => thread[0] || {});

	const outputPath = "./out/thread.js";
	fs.writeFileSync(outputPath, JSON.stringify(simplifiedData, null, 2));
	console.log(`Thread data has been written to2 ${outputPath}`);
}

main();
const fetchThread = async (threadId) => {
	const finalData = [];
	for (const threadId of exportedThread4) {
		const myThread = await openai.beta.threads.retrieve(threadId);
		console.log(myThread);
		const threadMessages = await openai.beta.threads.messages.list(threadId);
		finalData.push(threadMessages.data);
	}
	console.log(finalData);
	const outputPath = "./threadMessages2.json";
	fs.writeFileSync(outputPath, JSON.stringify(finalData, null, 2));
	console.log(`Thread messages data has been written to2 ${outputPath}`);
};
