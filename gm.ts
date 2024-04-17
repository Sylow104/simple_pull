// greasemonkey variant

declare function GM_xmlhttpRequest(a: to_use): void;

interface to_use {
	url: string;
	method: string;
	headers? : HeadersInit;
	onload: (r: any) => void;
	onerror: (r: any) => void;
}

export function pull<T>(info : pull_i<T>): Promise<string> {
	let _url = info.url_gen(info.obj);
	return new Promise((resolve, fail) => {
		GM_xmlhttpRequest({
			url: _url,
			method: "GET",
			headers : info.headers,
			onload: async (r) => {
				resolve(r.responseText);
			},
			onerror: async (r) => {
				fail(`unable to pull ${_url}`);
			}
		});
	});
}

export interface pull_i<T>
{
	obj : T;
	url_gen : (a : T) => string;
	headers? : HeadersInit;
};


// multi pull could be converted to an single domain, multiple requests to various sublets instead TODO
export async function multi_pull<T>(objs : T[], url_gen : (a : T) => string,  headers? : HeadersInit)
{
	return await Promise.allSettled(objs.map(async (v, i, a) => {
		return pull({obj : v, url_gen : url_gen, headers : headers});
	})).then((v) => {
		return v.map((q, j, b) => {
			if (q.status === 'fulfilled') {
				return q.value;
			} else {
				return undefined;
			};
		});
	});

	/*
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
	*/
};