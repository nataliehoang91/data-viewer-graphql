"use client";
import { useAuth } from "@/context/authContext";
import { deleteServerCookie, setServerCookie } from "@/utils/cookiesActions";
import {
	Box,
	Button,
	Container,
	HStack,
	Input,
	Link,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";

import UpdateInfoModal from "./UpdateInfoModal";

const Navbar = ({ isSignedIn, username, jobTitle }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	const signOut = () => {
		deleteServerCookie("username");
		deleteServerCookie("jobTitle");
	};
	return (
		<Box as="nav" bg="gray.800" color="white">
			<Container maxW="container.md" py={4}>
				<HStack justify="space-between" align="center">
					<Link href="/">
						<Button>Home</Button>
					</Link>
					<HStack spacing={4}>
						{isSignedIn ? (
							<>
								<Box>
									{username} - {jobTitle}
								</Box>
								{isSignedIn && <UpdateInfoModal />}
								<Button onClick={signOut}>Log Out</Button>
							</>
						) : (
							<>
								<Link href="/signIn">
									<Button>Sign In</Button>
								</Link>
							</>
						)}
					</HStack>
				</HStack>
			</Container>
		</Box>
	);
};

export default Navbar;
