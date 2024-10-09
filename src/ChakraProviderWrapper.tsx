"use client";

import { ChakraProvider } from "@chakra-ui/react";

const config = {
	initialColorMode: "system",
	useSystemColorMode: true,
};

const ChakraWrapper = ({ children }: { children: React.ReactNode }) => {
	return <ChakraProvider>{children}</ChakraProvider>;
};

export default ChakraWrapper;
