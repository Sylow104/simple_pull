// greasemonkey variant

declare function GM_xmlhttpRequest(a: to_use): void;
declare namespace GM
{
	function xmlHttpRequest(a : to_use) : void;
};

interface to_use {
	url: string;
	method: string;
	headers? : HeadersInit;
	data? : string;
	onload: (r: any) => void;
	onerror: (r: any) => void;
	ontimeout : (r: any) => void;
	nocache : boolean;
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
			},
			ontimeout: async (r) => {
				console.log(`timed out`);
				f(`timed out on ${info.url}`);
			},
			nocache : true,
		});
	});
};

// idea for new pull function
export async function pull3<T>(info : pull3_i<T>)
{
	return new Promise((p, f) => {
		GM_xmlhttpRequest({
			url : info.url,
			method : info.method ?? PULL_METHOD.GET,
			headers : info.headers,
			data : info.data ?? undefined,
			onload: async (r) => {
				p(info.onsuccess(r.responseText));
			},
			onerror: async (r) => {
				console.log(`unable to pull ${info.url}`);
				f(`unable to pull ${info.url}`);
			},
			ontimeout: async (r) => {
				console.log(`timed out`);
				f(`timed out on ${info.url}`);
			},
			nocache : true,

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

export class pull3_i<T> extends pull2_i
{
	onsuccess : (data : string) => void;
};