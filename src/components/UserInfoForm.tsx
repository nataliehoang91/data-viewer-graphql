"use client";

import { FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";

type UserInfoFormProps = {
	userName?: string;
	jobTitle?: string;
};

const UserInfoForm = ({ userName, jobTitle }: UserInfoFormProps) => {
	return (
		<VStack spacing={4} align="stretch" w="100%">
			<FormControl isRequired>
				<FormLabel>Username</FormLabel>
				<Input
					name="userName"
					type="text"
					placeholder="Enter your username"
					defaultValue={userName}
					size="lg"
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Job Title</FormLabel>
				<Input
					name="jobTitle"
					type="text"
					placeholder="Enter your job title"
					defaultValue={jobTitle}
					size="lg"
				/>
			</FormControl>
		</VStack>
	);
};

export default UserInfoForm;
