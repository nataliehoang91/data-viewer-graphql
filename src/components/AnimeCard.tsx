import { Badge, Box, HStack, Image, Text, VStack } from "@chakra-ui/react";

type AnimeCardProps = {
	anime: {
		id: number;
		title: {
			romaji: string;
		};
		coverImage: {
			large: string;
		};
		genres: string[];
		averageScore: number;
	};
	onClick: () => void;
	isSelected: boolean;
};

const AnimeCard = ({ anime, onClick, isSelected }: AnimeCardProps) => {
	return (
		<Box
			position="relative"
			borderRadius="lg"
			overflow="hidden"
			onClick={onClick}
			cursor="pointer"
			transition="all 0.2s"
			_hover={{ transform: "scale(1.05)", shadow: "lg" }}
			height="400px"
			border={isSelected ? "2px solid" : "none"}
			borderColor={isSelected ? "blue.500" : "transparent"}
			bg="bg-surface"
			shadow="md"
		>
			<Image
				src={anime.coverImage.large}
				alt={anime.title.romaji}
				objectFit="cover"
				width="100%"
				height="70%"
			/>
			<VStack p="4" height="30%" alignItems="flex-start" spacing={2}>
				<Text color="text" fontWeight="bold" fontSize="lg" noOfLines={2}>
					{anime.title.romaji}
				</Text>
				<HStack spacing={2} flexWrap="wrap">
					{anime.genres.slice(0, 2).map((genre, index) => (
						<Badge
							key={`${anime.id}-${index}`}
							borderRadius="full"
							px="2"
							colorScheme="teal"
						>
							{genre}
						</Badge>
					))}
				</HStack>
				<Text color="text" fontSize="sm">
					Score: {anime.averageScore}
				</Text>
			</VStack>
		</Box>
	);
};

export default AnimeCard;
