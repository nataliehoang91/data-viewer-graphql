"use client";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

type UserInfoFormProps = {
	userName?: string;
	jobTitle?: string;
};
const UserInfoForm = ({ userName, jobTitle }: UserInfoFormProps) => {
	return (
		<>
			<FormControl>
				<FormLabel>Username</FormLabel>
				<Input
					name="userName"
					type="text"
					placeholder="Username"
					value={userName}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Job Title</FormLabel>
				<Input
					name="jobTitle"
					type="text"
					placeholder="Job Title"
					value={jobTitle}
				/>
			</FormControl>
		</>
	);
};

export default UserInfoForm;
