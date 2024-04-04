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
			}
		});
	});
}

export async function multi_pull(urls : string[])
{
	return await Promise.allSettled(urls.map((v, i, a) => {
		return pull(v);
	})).then((v) => {
		return v.map((q, j, b) => {
			return new Promise<string>((resolve, reject) => {
				if (q.status === 'fulfilled') {
					resolve(q.value);
				} else {
					reject(q.status + `-` + q.reason);
				}
			});
		});
	});
};