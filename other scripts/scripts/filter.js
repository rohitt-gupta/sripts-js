import { scranton } from "../export.js";
import fs from "fs";

const metadata = scranton.map((user) => user.metadata);

const metadataContent = `const metadata = ${JSON.stringify(
	metadata,
	null,
	2
)};`;

fs.writeFileSync("metadata.js", metadataContent, "utf8");

console.log("Metadata has been saved to metadata.js");
