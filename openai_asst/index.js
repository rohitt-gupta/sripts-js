import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY_ANON
);

const newData = 

const saveThread = async (thread) => {
	const { data: updatedThread, error: threadsError } = await supabase;
	// First, check if the thread already exists
	const { data: existingThread, error: fetchError } = await supabase
		.from("threads")
		.select()
		.eq("id", thread.id)
		.single();

	if (fetchError && fetchError.code !== "PGRST116") {
		console.error("Error fetching thread:", fetchError);
		throw new Error("Failed to fetch thread");
	}

	if (!existingThread) {
		console.log("Thread doesn't exist, upserting data", thread);

		// If thread doesn't exist, upsert the data
		const { data: updatedThread, error: threadsError } = await supabase
			.from("threads")
			.upsert({
				id: thread.id,
				created_at: thread.created_at,
				title: thread.title,
				share_path: thread.path,
			})
			.select()
			.single();

		if (threadsError) {
			console.error("Error saving thread:", threadsError);
			throw new Error("Failed to save thread");
		}
	}
};

function main() {
	for (const thread of newData) {
		saveThread(thread);
	}
}

main();
