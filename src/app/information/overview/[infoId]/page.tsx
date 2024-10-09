"use client";

import CustomDrawer from "@/components/CustomDrawer";
import { gql, useQuery } from "@apollo/client";
import {
	AspectRatio,
	Badge,
	Box,
	Link as ChakraLink,
	DrawerBody,
	DrawerHeader,
	HStack,
	Image,
	Skeleton,
	SkeletonText,
	Text,
	VStack,
} from "@chakra-ui/react";
import Link from "next/link";

const GET_ANIME_BY_ID = gql`
  query ($id: Int) {
    Media(id: $id) {
      id
      title {
        romaji
        english
      }
      coverImage {
        large
      }
      description
      genres
      averageScore
      siteUrl
    }
  }
`;

const InformationOverviewModal = ({
	params,
}: { params: { infoId: string } }) => {
	const { data, loading, error } = useQuery(GET_ANIME_BY_ID, {
		variables: { id: Number(params.infoId) },
	});

	const anime = data?.Media;
	console.log("hhh", anime?.siteUrl);

	return (
		<CustomDrawer
			size="lg"
			blockScrollOnMount={false}
			trapFocus={false}
			autoFocus={false}
			disabled={loading}
		>
			{loading ? (
				<Box p={6}>
					<Skeleton height="20px" width="80%" />
					<Skeleton height="400px" width="100%" mt={4} />
					<SkeletonText mt={4} noOfLines={6} spacing="4" skeletonHeight="2" />
				</Box>
			) : error ? (
				<Text color="error">Error: Unable to load data</Text>
			) : (
				<>
					<DrawerHeader borderBottomWidth="1px">
						{anime?.title.romaji}
					</DrawerHeader>
					<DrawerBody>
						<VStack align="stretch" spacing={6}>
							<AspectRatio ratio={16 / 9} maxH="300px">
								<Image
									src={anime?.coverImage.large}
									alt={anime?.title.romaji}
									objectFit="cover"
									borderRadius="md"
								/>
							</AspectRatio>
							<VStack align="stretch" spacing={3}>
								<Text fontWeight="bold">{anime?.title.english}</Text>
								<ChakraLink color="teal.500" href={anime.siteUrl} isExternal>
									View more details
								</ChakraLink>

								<HStack>
									<Text fontWeight="bold">Genres:</Text>
									<HStack spacing={2} flexWrap="wrap">
										{anime?.genres.map((genre: string, index: number) => (
											<Badge key={genre} colorScheme="teal" borderRadius="full">
												{genre}
											</Badge>
										))}
									</HStack>
								</HStack>
								<Text>
									<strong>Average Score:</strong> {anime?.averageScore}
								</Text>
								<Text fontWeight="bold">Description:</Text>
								<Box
									// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
									dangerouslySetInnerHTML={{ __html: anime?.description || "" }}
									sx={{
										p: {
											marginBottom: "1em",
										},
									}}
								/>
							</VStack>
						</VStack>
					</DrawerBody>
				</>
			)}
		</CustomDrawer>
	);
};

export default InformationOverviewModal;
