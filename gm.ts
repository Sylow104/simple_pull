// greasemonkey variant

declare function GM_xmlhttpRequest(a: to_use): void;

interface to_use {
	url: string;
	method: string;
	headers? : HeadersInit;
	onload: (r: any) => void;
	onerror: (r: any) => void;
}

export function pull(url_to_pull: string, headers? : HeadersInit): Promise<string> {
	return new Promise((resolve, fail) => {
		GM_xmlhttpRequest({
			url: url_to_pull,
			method: "GET",
			headers : headers,
			onload: async (r) => {
				resolve(r.responseText);
			},
			onerror: async (r) => {
				fail(`unable to pull ${url_to_pull}`);
			}
		});
	});
}

export async function multi_pull(urls : string[], headers? : HeadersInit)
{
	const v_1 = await Promise.allSettled(urls.map(async (v, i, a) => {
		return pull(v, headers);
	}));
	return v_1.map((q, j, b) => {
		return new Promise<string>((resolve, reject) => {
			if (q.status === 'fulfilled') {
				//console.log(q.status + `-` + q.value);
				resolve(q.value);
			} else {
				reject(q.status + `-` + q.reason);
			}
		});
	});
};