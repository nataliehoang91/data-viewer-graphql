"use client";

import { deleteServerCookie } from "@/utils/cookiesActions";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Container,
	Flex,
	HStack,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import ColorModeToggle from "./ColorModeToggle";

type NavbarProps = {
	isSignedIn: boolean;
	username: string;
	jobTitle: string;
};

const Navbar = ({ isSignedIn, username, jobTitle }: NavbarProps) => {
	const signOut = () => {
		deleteServerCookie("username");
		deleteServerCookie("jobTitle");
	};

	const bgColor = useColorModeValue("white", "gray.800");
	const textColor = useColorModeValue("gray.800", "white");

	return (
		<Box as="nav" bg={bgColor} color={textColor} boxShadow="sm">
			<Container maxW="container.xl" py={4}>
				<Flex justify="space-between" align="center">
					<NextLink href="/" passHref legacyBehavior>
						<Button as="a" variant="ghost">
							Home
						</Button>
					</NextLink>
					<HStack spacing={4}>
						<ColorModeToggle />
						{isSignedIn ? (
							<Menu>
								<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
									<Text as="span" fontWeight="medium" mr={2}>
										{username}
									</Text>
									<Text as="span" fontSize="sm" color="gray.500">
										{jobTitle}
									</Text>
								</MenuButton>
								<MenuList>
									<NextLink href="/profile" passHref legacyBehavior>
										<MenuItem as="a">Profile</MenuItem>
									</NextLink>
									<MenuItem onClick={signOut}>Log Out</MenuItem>
								</MenuList>
							</Menu>
						) : (
							<NextLink href="/signIn" passHref legacyBehavior>
								<Button as="a" colorScheme="blue">
									Sign In
								</Button>
							</NextLink>
						)}
					</HStack>
				</Flex>
			</Container>
		</Box>
	);
};

export default Navbar;
