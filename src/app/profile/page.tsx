import SubmitButton from "@/components/SubmitButton";
import UpdateInfoForm from "@/components/UserInfoForm";
import { getServerCookie, setServerCookie } from "@/utils/cookiesActions";
import {
	Box,
	Button,
	Container,
	FormControl,
	FormLabel,
	Input,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Profile = async () => {
	const userName = await getServerCookie("userName");
	const jobTitle = await getServerCookie("jobTitle");

	if (!userName || !jobTitle) {
		redirect("/signIn");
	}

	const handleUpdate = async (formData: FormData) => {
		"use server";

		const userName = formData.get("userName") as string;
		const jobTitle = formData.get("jobTitle") as string;
		console.log(userName, jobTitle);
		if (userName) {
			setServerCookie("username", userName);
			setServerCookie("jobTitle", jobTitle);
			redirect("/");
		} else {
			// do sth
		}
	};

	return (
		<Container centerContent>
			<VStack spacing={4}>
				<Box p={6} shadow="md" borderWidth="1px" width="md" borderRadius="md">
					<form action={handleUpdate}>
						<UpdateInfoForm userName={userName} jobTitle={jobTitle} />
						<SubmitButton>Update</SubmitButton>
					</form>
				</Box>
			</VStack>
		</Container>
	);
};

export default Profile;
