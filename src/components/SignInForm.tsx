"use client";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useFormState, useFormStatus } from "react-dom";

const SignInForm = () => {
	const { pending } = useFormStatus();
	return (
		<>
			<FormControl>
				<FormLabel>Username</FormLabel>
				<Input name="username" type="text" placeholder="Username" required />
			</FormControl>
			<FormControl>
				<FormLabel>Job Title</FormLabel>
				<Input name="jobTitle" type="text" placeholder="Job Title" required />
			</FormControl>
			<Button colorScheme="blue" type="submit" isLoading={pending}>
				Sign In
			</Button>
		</>
	);
};

export default SignInForm;
