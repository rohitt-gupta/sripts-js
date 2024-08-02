import crypto from "crypto-js";

const hashedPassword =
	"a557923e42c9b11768c8b60bf83f44b45cdbd4d7442879f35378b0ca608ef04d";
const salt = "ec0d8b8d-5d96-4d03-863d-d0d540798f5c";

const decryptedPassword = crypto.AES.decrypt(hashedPassword, salt).toString(
	crypto.enc.Utf8
);

console.log("decrypted password", decryptedPassword);
