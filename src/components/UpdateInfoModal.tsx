import { getServerCookie, setServerCookie } from "@/utils/cookiesActions"; // Assuming you have this file
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const UpdateInfoModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [username, setUsername] = useState<string>("");
	const [jobTitle, setJobTitle] = useState<string>("");

	// Fetch cookies asynchronously when the component loads
	useEffect(() => {
		// Wrap in an async function since useEffect cannot directly accept async
		const fetchData = async () => {
			const storedUsername = await getServerCookie("username");
			const storedJobTitle = await getServerCookie("jobTitle");

			setUsername(storedUsername);
			setJobTitle(storedJobTitle);
		};

		fetchData();
	}, []); // Empty dependency array so this runs only once

	const handleUpdate = async () => {
		// Set cookies after clicking update
		setServerCookie("username", username);
		setServerCookie("jobTitle", jobTitle);
		onClose();
	};

	return (
		<>
			<Button onClick={onOpen}>Update Info</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update Profile</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl mb={4}>
							<FormLabel>Username</FormLabel>
							<Input
								placeholder="Enter your username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</FormControl>
						<FormControl mb={4}>
							<FormLabel>Job Title</FormLabel>
							<Input
								placeholder="Enter your job title"
								value={jobTitle}
								onChange={(e) => setJobTitle(e.target.value)}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" onClick={handleUpdate}>
							Update
						</Button>
						<Button ml={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default UpdateInfoModal;
