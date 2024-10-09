import { Box, Container, Heading, VStack } from "@chakra-ui/react";

const Home = () => {
	return (
		<Container maxW="container.lg" py={10} minH="100vh">
			<VStack spacing={6}>
				<Heading>Welcome to the App</Heading>
			</VStack>
		</Container>
	);
};

export default Home;
