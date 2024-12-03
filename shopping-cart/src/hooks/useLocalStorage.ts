import { useEffect, useState } from "react";

// T states generic type,whatever type of useLocalStorage will be the initial value will also be same type or a func that returns that type
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
	const [value, setValue] = useState(() => {
		const jsonValue = localStorage.getItem(key);
		if (jsonValue !== null) {
			return JSON.parse(jsonValue);
		}
		if (typeof initialValue === "function") {
			return (initialValue as () => T)();
		} else {
			return initialValue;
		}
	});

	useEffect(
		() => localStorage.setItem(key, JSON.stringify(value)),
		[key, value]
	);

	return [value, setValue] as [typeof value, typeof setValue];
}
