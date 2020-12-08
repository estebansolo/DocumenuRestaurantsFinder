import sha512 from "js-sha512";


export const shaEncrypt = (msg) => {
	const hash = sha512(msg);
	return hash.toString("hex");
};
