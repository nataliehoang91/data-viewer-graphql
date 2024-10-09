"use client";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";

const ColorModeToggle = () => {
	const { toggleColorMode } = useColorMode();
	const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

	return (
		<IconButton
			aria-label="Toggle color mode"
			icon={<SwitchIcon />}
			onClick={toggleColorMode}
			variant="outline"
			colorScheme="teal"
			borderRadius="md"
		/>
	);
};

export default ColorModeToggle;
