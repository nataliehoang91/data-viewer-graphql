import AnimeCard from "@/components/AnimeCard";
import SkeletonCard from "@/components/SkeletonCard";
import type { AnimeData } from "@/types";
import { SimpleGrid, Text, VStack, useColorModeValue } from "@chakra-ui/react";

const InfoGrid = ({
	loading,
	media,
	openAnimeModal,
	infoId,
}: {
	loading: boolean;
	media: AnimeData[];
	openAnimeModal: (animeId: number) => void;
	infoId: number;
}) => {
	const textColor = useColorModeValue("gray.700", "gray.200");

	return (
		<VStack spacing={8}>
			<Text fontSize="3xl" fontWeight="bold" color={textColor}>
				Popular Anime
			</Text>
			<SimpleGrid columns={[1, 2, 3, 4]} spacing={8} w="100%">
				{loading
					? Array.from({ length: 12 }).map((_, index) => (
							<SkeletonCard key={`skeleton-${index + 1}`} />
						))
					: media.map((anime: AnimeData) => (
							<AnimeCard
								key={anime.id}
								anime={anime}
								onClick={() => openAnimeModal(anime.id)}
								isSelected={anime.id === infoId}
							/>
						))}
			</SimpleGrid>
		</VStack>
	);
};

export default InfoGrid;
