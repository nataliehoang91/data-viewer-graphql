import ViewInformationPageButton from "@/components/ViewInformationPageButton";
import { getServerCookie } from "@/utils/cookiesActions";
import { Box, Container, Heading, VStack } from "@chakra-ui/react";

const Home = async () => {
	const savedUsername = await getServerCookie("userName");
	const savedJobTitle = await getServerCookie("jobTitle");

	const isSignedIn = savedUsername && savedJobTitle;

	return (
		<Container maxW="container.lg" py={10} minH="100vh">
			<VStack spacing={6}>
				<Heading>Welcome to the App</Heading>
				{isSignedIn && <ViewInformationPageButton />}
			</VStack>
		</Container>
	);
};

export default Home;
