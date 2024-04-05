import { multi_pull } from "./gm";

multi_pull(["https://google.com", "https://reddit.com", "http://jasdlw.com"],
	(a) => {return a})
	.then((v) => {v.forEach((q, j, b) => {
			const parser = new DOMParser();
			let doc = parser.parseFromString(q, 'text/html');
			//console.log(`checking out - ${a}`);
			console.log(doc);
		})})
	.catch(console.log);
