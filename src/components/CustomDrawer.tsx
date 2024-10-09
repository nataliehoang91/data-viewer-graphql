"use client";

import {
	Button,
	Drawer as ChakraDrawer,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerOverlay,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

export default function Drawer({
	disabled,
	children,
	...props
}: { disabled: boolean } & Omit<
	ComponentProps<typeof ChakraDrawer>,
	"isOpen" | "onClose"
>) {
	const router = useRouter();
	const handleClose = () => {
		router.back();
	};

	return (
		<ChakraDrawer {...props} isOpen onClose={handleClose}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton disabled={disabled} />
				{children}
			</DrawerContent>
		</ChakraDrawer>
	);
}
