"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const config = {
	initialColorMode: "light",
	useSystemColorMode: false,
};

const theme = extendTheme({ config });

const ChakraProviderWrapper = ({ children }: { children: React.ReactNode }) => {
	return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default ChakraProviderWrapper;
