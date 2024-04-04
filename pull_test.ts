import { multi_pull } from "./gm";

multi_pull(["https://google.com", "https://reddit.com", "http://jasdlw.com"])
	.then((v) => (v.forEach((v, i, a) => {
		v.then((a) => {
			const parser = new DOMParser();
			let doc = parser.parseFromString(a, 'text/html');
			//console.log(`checking out - ${a}`);
			console.log(doc);
		}).catch(console.log);
	})
));
