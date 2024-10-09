import ApolloProviderWrapper from "@/ApolloProviderWraper";
import ChakraProviderWrapper from "@/ChakraProviderWrapper";
import Navbar from "@/components/Navbar";
import { getServerCookie } from "@/utils/cookiesActions";
import { Suspense } from "react";

const RootLayout = async ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const userName = await getServerCookie("userName");
	const jobTitle = await getServerCookie("jobTitle");
	console.log("userName", userName);
	console.log("jobTitle", jobTitle);

	return (
		<html lang="en">
			<body>
				<ApolloProviderWrapper>
					<ChakraProviderWrapper>
						<Navbar
							isSignedIn={userName && jobTitle}
							username={userName}
							jobTitle={jobTitle}
						/>
						<Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
					</ChakraProviderWrapper>
				</ApolloProviderWrapper>
			</body>
		</html>
	);
};

export default RootLayout;
