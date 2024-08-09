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