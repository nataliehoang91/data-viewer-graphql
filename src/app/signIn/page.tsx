import SignInForm from "@/components/SignInForm";
import { setServerCookie } from "@/utils/cookiesActions";
import { Box, Container, Text, VStack } from "@chakra-ui/react";
import { redirect } from "next/navigation";

const SignIn = () => {
	const handleSignIn = async (formData: FormData) => {
		"use server";

		const username = formData.get("username") as string;
		const jobTitle = formData.get("jobTitle") as string;
		console.log(username, jobTitle);
		if (username) {
			setServerCookie("username", username);
			setServerCookie("jobTitle", jobTitle);
			redirect("/");
		} else {
			// do sth
		}
	};

	return (
		<Container centerContent>
			<VStack spacing={4}>
				<Text fontSize="2xl" fontWeight="bold">
					Sign In
				</Text>
				<Box p={6} shadow="md" borderWidth="1px" width="md" borderRadius="md">
					<form action={handleSignIn}>
						<SignInForm />
					</form>
				</Box>
			</VStack>
		</Container>
	);
};
export default SignIn;
