"use client";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const ViewInformationPageButton = () => {
	const router = useRouter();

	return (
		<Button onClick={() => router.push("/information")}>
			View Information
		</Button>
	);
};

export default ViewInformationPageButton;
