import SubmitButton from "@/components/SubmitButton";
import UserInfoForm from "@/components/UserInfoForm";
import { getServerCookie, setServerCookie } from "@/utils/cookiesActions";
import {
	Box,
	Container,
	Heading,
	Text,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { redirect } from "next/navigation";

const Profile = async () => {
	const userName = await getServerCookie("userName");
	const jobTitle = await getServerCookie("jobTitle");

	if (!userName || !jobTitle) {
		redirect("/signIn");
	}

	const handleUpdate = async (formData: FormData) => {
		"use server";

		const newUserName = formData.get("userName") as string;
		const newJobTitle = formData.get("jobTitle") as string;

		if (newUserName) {
			setServerCookie("userName", newUserName);
			setServerCookie("jobTitle", newJobTitle);
			redirect("/profile?updated=true");
		} else {
			redirect("/profile?error=true");
		}
	};

	return (
		<Container maxW="md" py={12}>
			<VStack spacing={8} align="stretch">
				<Heading as="h1" size="xl" textAlign="center">
					Your Profile
				</Heading>
				<Box p={8} boxShadow="lg" borderRadius="lg">
					<VStack spacing={6}>
						<Text fontSize="lg" fontWeight="medium">
							Welcome back, {userName}!
						</Text>
						<form action={handleUpdate} style={{ width: "100%" }}>
							<VStack spacing={6}>
								<UserInfoForm userName={userName} jobTitle={jobTitle} />
								<SubmitButton type="submit" width="full">
									Update Profile
								</SubmitButton>
							</VStack>
						</form>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};

export default Profile;
