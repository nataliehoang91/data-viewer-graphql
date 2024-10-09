"use server";

import { cookies } from "next/headers";

export const setServerCookie = (name: string, value: string) => {
	const cookieStore = cookies();
	cookieStore.set(name, value, {
		path: "/",
	});
};

export const getServerCookie = (name: string) => {
	const cookieStore = cookies();
	return cookieStore.get(name)?.value || "";
};

export const deleteServerCookie = (name: string) => {
	const cookieStore = cookies();
	cookieStore.set(name, "", {
		path: "/",
		maxAge: 0,
	});
};
