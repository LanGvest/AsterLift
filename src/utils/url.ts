import Config from "@config";

export function validateUrl(url: string): string {
	if(url.startsWith("http")) return url;
	if(!url.startsWith("/")) url = "/" + url;
	return Config.PROJECT_ORIGIN + url;
}