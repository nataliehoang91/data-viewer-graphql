import { AspectRatio, Box, Skeleton, SkeletonText } from "@chakra-ui/react";

const SkeletonCard = () => (
	<Box borderWidth="1px" borderRadius="lg" overflow="hidden">
		<AspectRatio ratio={150 / 200} maxW="100%">
			<Skeleton />
		</AspectRatio>
		<Box p="4">
			<SkeletonText mt={4} noOfLines={2} spacing="2" skeletonHeight="2" />
		</Box>
	</Box>
);

export default SkeletonCard;
