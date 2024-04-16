import type {CSSProperties, Dispatch, MutableRefObject, SetStateAction} from "react";

export type Nullable<T> = T | null;
export type Undefinable<T> = T | undefined;
export type Optional<T> = T | undefined | null;
export type SetState<T> = Dispatch<SetStateAction<T>>;
export type StateRef<T> = MutableRefObject<T>;
export type SetStateRef<T> = (value: (prevState: T) => T) => void;

export interface Stylized {
	className?: string
	style?: CSSProperties
}

export type Environment = "development" | "production" | "test";

export function getNodeEnvironment(): Environment {
	return process.env.NODE_ENV as Undefinable<Environment> || "production";
}

export function getProjectEnvironment(): Environment {
	return process.env.NEXT_PUBLIC_PROJECT_ENV as Undefinable<Environment> || getNodeEnvironment();
}

export function isDevelopment(): boolean {
	return getProjectEnvironment() === "development";
}

export function isClient(): boolean {
	return Boolean(globalThis.window);
}

export function isServer(): boolean {
	return !isClient();
}

export function combineClasses(...classNames: Array<Optional<string | boolean>>): Undefinable<string> {
	return classNames.filter(item => item && typeof item === "string").join(" ") || undefined;
}

export function getDefaultSliderProgress<T>(_activeItem: T, activeIndex: number, items: Array<T>): string {
	return `${activeIndex + 1} из ${items.length}`;
}

let currentId: number = 0;

export function getNextId(): string {
	return (currentId++).toString();
}

export function microdataToString(microdata: object): string {
	return JSON.stringify({
		"@context": "https://schema.org",
		...microdata
	});
}

export function sizeToString(size: number): string {
	if(size >= 1048576) return `${Number((size / 1048576).toFixed(1))} МБ`;
	if(size >= 1024) return `${Number((size / 1024).toFixed(1))} КБ`;
	return `${size} Б`;
}

export const COMPANY_FOUNDING_DATE: Date = new Date("2014-12-11");

export function getCompanyAge(): number {
	const diff = new Date().getTime() - COMPANY_FOUNDING_DATE.getTime();
	return ~~(diff / 31536000000);
}

export function withoutDot(text: string): string {
	text = text.trim();
	if(text.endsWith(".")) text = text.substring(0, text.length - 1);
	return text;
}

export function lowerCaseFirst(text: string): string {
	return text[0].toLowerCase() + text.substring(1, text.length);
}

export function getCorrectWord(_0: string, _1: string, _2: string, amount: number): string {
	let str: string = `${amount}`;
	if(str.length > 1) {
		switch(str.substring(str.length - 2)) {
			case "11":
			case "12":
			case "13":
			case "14": return _0;
		}
	}
	switch(str.substring(str.length - 1)) {
		case "1": return _1;
		case "2":
		case "3":
		case "4": return _2;
		default: return _0;
	}
}

export function getPriorityIndexes(activeIndex: number, totalAmount: number, toPreload: number): Array<number> {
	const arr: Array<number> = [];

	for(let i = toPreload * -1; i <= toPreload; i++) {
		let index: number = (activeIndex + i) % totalAmount;
		if(index < 0) index += totalAmount;
		arr.push(index);
	}

	return arr;
}

export function isPriority(index: number, priorityIndexes: Array<number>): boolean {
	return Boolean(~priorityIndexes.indexOf(index));
}

export function xml(strings: TemplateStringsArray, ...expr: any[]): string {
	let code = strings[0];

	for(let i = 0; i < expr.length; i++) code += expr[i] + strings[i + 1];

	code = code.replace(/[\t\n]/g, "").trim();

	return `<?xml version="1.0" encoding="UTF-8"?>${code}`;
}

export function uri(strings: TemplateStringsArray, ...expr: any[]): string {
	let code = strings[0];

	for(let i = 0; i < expr.length; i++) code += expr[i] + strings[i + 1];

	code = code.replace(/\s/g, "");

	return code;
}

export const FULLSCREEN_HINT: string = "Нажмите, чтобы открыть во весь экран";

export function getDefaultSlideFullscreenHint(): string {
	return FULLSCREEN_HINT;
}

export function truncate(text: string, maxLength: number, ending: string = "..."): string {
	if(text.length <= maxLength) return text;
	return text.substring(0, maxLength).trim() + ending;
}

interface Months {
	[id: number]: string
}

const months: Months = {
	1: "января",
	2: "февраля",
	3: "марта",
	4: "апреля",
	5: "мая",
	6: "июня",
	7: "июля",
	8: "августа",
	9: "сентября",
	10: "октября",
	11: "ноября",
	12: "декабря"
};

export function getDiscountDeadline(): string {
	const now = new Date();
	const daysInCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
	return `до ${daysInCurrentMonth} ${months[now.getMonth() + 1]}`;
}

export function getHashCode(value: string): number {
	let hash = 0, i, chr;
	if(value.length === 0) return hash;
	for(i = 0; i < value.length; i++) {
		chr = value.charCodeAt(i);
		// eslint-disable-next-line no-bitwise
		hash = ((hash << 5) - hash) + chr;
		// eslint-disable-next-line no-bitwise
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}

export function toLocalString(number: number): string {
	return number.toLocaleString("ru-RU");
}