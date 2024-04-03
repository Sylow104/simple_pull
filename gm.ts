// greasemonkey variant

declare function GM_xmlhttpRequest(a: to_use): void;

interface to_use {
	url: string;
	method: string;
	onload: (r: any) => void;
	onerror: (r: any) => void;
}

export async function pull(url_to_pull: string): Promise<string> {
	return await new Promise((resolve, fail) => {
		GM_xmlhttpRequest({
			url: url_to_pull,
			method: "GET",
			onload: async (r) => {
				resolve(r.responseText);
			},
			onerror: async (r) => {
				fail(`unable to pull ${url_to_pull}`);
			},
		});
	});
}
