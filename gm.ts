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

export async function pull2(info : pull2_i) : Promise<string>
{
	console.log(`pull2: pulling ${info.url} with ${info.method}`);
	return await new Promise((p, f) => {
		GM_xmlhttpRequest({
			url : info.url,
			method : info.method ?? PULL_METHOD.GET,
			headers : info.headers,
			onload: async (r) => {
				console.log(`response text: ${r.responseText}`);
				p(r.responseText);
			},
			onerror: async (r) => {
				f(`unable to pull ${info.url}`);
			}
		});
	});
};

export enum PULL_METHOD
{
	GET = "GET",
	POST = "POST",
	PUT = "PUT"
};

export class pull2_i
{
	url : string;
	method? : PULL_METHOD;
	headers? : HeadersInit
};

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