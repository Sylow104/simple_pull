// greasemonkey variant

declare function GM_xmlhttpRequest(a: to_use): void;

interface to_use {
	url: string;
	method: string;
	headers? : HeadersInit;
	data? : string;
	onload: (r: any) => void;
	onerror: (r: any) => void;
}

export async function pull2(info : pull2_i) : Promise<string>
{
	return new Promise((p, f) => {
		GM_xmlhttpRequest({
			url : info.url,
			method : info.method ?? PULL_METHOD.GET,
			headers : info.headers,
			data : info.data ?? undefined,
			onload: async (r) => {
				p(r.responseText);
			},
			onerror: async (r) => {
				console.log(`unable to pull ${info.url}`);
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
	data? : string;
};