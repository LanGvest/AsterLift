import type {CSSProperties, Dispatch, MutableRefObject, SetStateAction} from "react";
import type {Product} from "@/types/product";

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

export function combineClasses(...classNames: Array<Optional<string | boolean>>): Undefinable<string> {
	return classNames.filter(item => item && typeof item === "string").join(" ") || undefined;
}

export function getDefaultProductPageTitle(this: Product): string {
	return `${this.getName()} от ${this.minPrice.toLocaleString("ru-RU")} BYN`;
}

export function getDefaultProductName(this: Product): string {
	return `${this.type} ${this.model}`;
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