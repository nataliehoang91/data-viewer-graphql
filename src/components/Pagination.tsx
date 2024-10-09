import { Button, HStack, Text, useColorModeValue } from "@chakra-ui/react";

const Pagination = ({
	page,
	lastPage,
	loading,
	onPageChange,
}: {
	page: number;
	lastPage: number;
	loading: boolean;
	onPageChange: (newPage: number) => void;
}) => {
	const buttonColorScheme = useColorModeValue("blue", "teal");
	const textColor = useColorModeValue("gray.600", "gray.300");

	return (
		<HStack spacing={4} justifyContent="center">
			<Button
				onClick={() => onPageChange(1)}
				isDisabled={page === 1 || loading}
				size="sm"
				colorScheme={buttonColorScheme}
			>
				First
			</Button>
			<Button
				onClick={() => onPageChange(page - 1)}
				isDisabled={page === 1 || loading}
				size="sm"
				colorScheme={buttonColorScheme}
			>
				Previous
			</Button>
			<Text color={textColor} fontWeight="medium">
				Page {page} of {lastPage || "..."}
			</Text>
			<Button
				onClick={() => onPageChange(page + 1)}
				isDisabled={page >= lastPage || loading}
				size="sm"
				colorScheme={buttonColorScheme}
			>
				Next
			</Button>
			<Button
				onClick={() => onPageChange(lastPage)}
				isDisabled={page === lastPage || loading}
				size="sm"
				colorScheme={buttonColorScheme}
			>
				Last
			</Button>
		</HStack>
	);
};

export default Pagination;
