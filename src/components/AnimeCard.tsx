import { Box, Image, Text } from "@chakra-ui/react";

const AnimeCard = ({ anime, onClick }) => (
	<Box
		borderWidth="1px"
		borderRadius="lg"
		overflow="hidden"
		onClick={onClick}
		cursor="pointer"
		maxW="sm"
	>
		<Image
			src={anime.coverImage.large}
			alt={anime.title.romaji}
			width="100%"
			objectFit="cover"
			maxHeight="300px"
		/>
		<Box p="6">
			<Text fontWeight="bold">{anime.title.romaji}</Text>
			<Text fontSize="sm">{anime.genres.join(", ")}</Text>
		</Box>
	</Box>
);

export default AnimeCard;
