import { pull2 } from "./gm";

await Promise.all(
	["https://google.com", "https://reddit.com", "http://jasdlw.com"]
	.map((v) => {
		return pull2({url : v});
	})).then((q) => {
		q.forEach((r) => {
			const parser = new DOMParser();
			let doc = parser.parseFromString(r, 'text/html');
			//console.log(`checking out - ${a}`);
			console.log(doc);
		});
	});

console.log(`finished pulling everything`);