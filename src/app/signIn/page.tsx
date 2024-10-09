import SubmitButton from "@/components/SubmitButton";
import UserInfoForm from "@/components/UserInfoForm";
import { setServerCookie } from "@/utils/cookiesActions";
import { Box, Container, Heading, VStack, useToast } from "@chakra-ui/react";
import { redirect } from "next/navigation";

const SignIn = () => {
	const handleSignIn = async (formData: FormData) => {
		"use server";

		const userName = formData.get("userName") as string;
		const jobTitle = formData.get("jobTitle") as string;
		console.log(userName, jobTitle);
		if (userName) {
			setServerCookie("userName", userName);
			setServerCookie("jobTitle", jobTitle);
			redirect("/");
		} else {
			redirect("/signIn?error=true");
		}
	};

	return (
		<Container maxW="md" py={12}>
			<VStack spacing={8} align="stretch">
				<Heading as="h1" size="xl" textAlign="center">
					Welcome Back
				</Heading>
				<Box p={4} boxShadow="lg" borderRadius="lg" w="100%">
					<form action={handleSignIn}>
						<VStack spacing={6}>
							<UserInfoForm />
							<SubmitButton type="submit" width="full">
								Sign In
							</SubmitButton>
						</VStack>
					</form>
				</Box>
			</VStack>
		</Container>
	);
};

export default SignIn;
