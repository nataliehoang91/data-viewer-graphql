import SubmitButton from "@/components/SubmitButton";
import UserInfoForm from "@/components/UserInfoForm";
import { setServerCookie } from "@/utils/cookiesActions";
import { Box, Container, Text, VStack } from "@chakra-ui/react";
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
						<UserInfoForm />
						<SubmitButton type="submit">Sign In</SubmitButton>
					</form>
				</Box>
			</VStack>
		</Container>
	);
};
export default SignIn;
