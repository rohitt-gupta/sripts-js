# import re

# def extract_emails(file_path):
#     email_pattern = re.compile(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')
#     emails = []

#     with open(file_path, 'r', encoding='utf-8') as file:
#         for line in file:
#             matches = email_pattern.findall(line)
#             emails.extend(matches)

#     return emails

# if __name__ == "__main__":
#     file_path = '../data/redis.json'
#     emails = extract_emails(file_path)
#     for email in emails:
#         print(email)

import re

def extract_emails(file_path):
    email_pattern = re.compile(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')
    emails = []

    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            matches = email_pattern.findall(line)
            emails.extend(matches)

    return emails

def write_emails_to_js(emails, output_path):
    with open(output_path, 'w', encoding='utf-8') as file:
        file.write("const emails = [\n")
        for email in emails:
            file.write(f"    '{email}',\n")
        file.write("];\n")
        file.write("export default emails;\n")

if __name__ == "__main__":
    file_path = '../data/redis.json'
    output_path = '../data/output.js'
    emails = extract_emails(file_path)
    write_emails_to_js(emails, output_path)