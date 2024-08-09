# Steps to get the latest threads from redis and save to supabase

## Step 1: Get all the data from redis using data dump cli

$ upstash-redis-dump -db 0 -host exact-goat-54090.upstash.io -port 9283 -pass PASSWORD -tls > redis.dump

## Step 2: Get all the thread strings from the dump file.
- use extract_thread_strings.js to get all the thread strings from the dump file.
`
import json
import re

def extract_thread_ids(file_path):
    # Regular expression to match strings starting with "thread_" followed by 26 alphanumeric characters
    thread_pattern = re.compile(r'thread_[a-zA-Z0-9]+')
    thread_ids = set()

    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            matches = thread_pattern.findall(line)
            if matches:
                print(f"Found matches: {matches}")  # Debugging line
            thread_ids.update(matches)

    return list(thread_ids)

def write_to_json(data, output_path):
    with open(output_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4)

if __name__ == "__main__":
    input_file_path = 'redis.json'
    output_file_path = 'redis_dump_latest.js'

    # Extract thread IDs
    thread_ids = extract_thread_ids(input_file_path)
    print(f"Extracted thread IDs: {thread_ids}")  # Debugging line

    # Write the extracted thread IDs to a JSON file
    write_to_json(thread_ids, output_file_path)

    print(f"Extracted thread IDs have been written to {output_file_path}")
    `
- save the thread strings to a file.

## Step 3: Get all the thread messages open ai api.

`
const fetchThread = async (threadId) => {
	const finalData = [];
	for (const threadId of exportedThread4) {
		const myThread = await openai.beta.threads.retrieve(threadId);
		console.log(myThread);
		const threadMessages = await openai.beta.threads.messages.list(threadId);
		finalData.push(threadMessages.data);
	}
	% console.log(finalData);
	% const outputPath = "./threadMessages2.json";
	% fs.writeFileSync(outputPath, JSON.stringify(finalData, null, 2));
	% console.log(`Thread messages data has been written to2 ${outputPath}`);
};
`

## Step 4: FOrmat the data again according to out schema and db design.

`
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
`

## Step 5: Save the data to supabase in ./index.js

