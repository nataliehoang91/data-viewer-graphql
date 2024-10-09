"use client";

import { gql, useQuery } from "@apollo/client";
import {
	Box,
	Button,
	Container,
	HStack,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	Text,
	VStack,
	useDisclosure,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const GET_ANIME = gql`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: POPULARITY_DESC) {
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
      }
    }
  }
`;

const ITEMS_PER_PAGE = 12;

export default function InformationPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const page = Number(searchParams.get("page")) || 1;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedAnime, setSelectedAnime] = useState(null);

	const { loading, error, data } = useQuery(GET_ANIME, {
		variables: { page, perPage: ITEMS_PER_PAGE },
	});

	const handlePageChange = (newPage: number) => {
		router.push(`/information?page=${newPage}`);
	};

	const openAnimeModal = (anime) => {
		setSelectedAnime(anime);
		onOpen();
	};

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>Error: {error.message}</Text>;

	const { media, pageInfo } = data.Page;

	return (
		<Container maxW="container.xl" py={10}>
			<VStack spacing={6}>
				<Text fontSize="2xl" fontWeight="bold">
					Popular Anime
				</Text>
				<SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
					{media.map((anime) => (
						<Box
							key={anime.id}
							borderWidth="1px"
							borderRadius="lg"
							overflow="hidden"
							onClick={() => openAnimeModal(anime)}
							cursor="pointer"
						>
							<Image src={anime.coverImage.large} alt={anime.title.romaji} />
							<Box p="6">
								<Text fontWeight="bold">{anime.title.romaji}</Text>
								<Text fontSize="sm">{anime.genres.join(", ")}</Text>
							</Box>
						</Box>
					))}
				</SimpleGrid>
				<HStack>
					<Button
						onClick={() => handlePageChange(page - 1)}
						isDisabled={page === 1}
					>
						Previous
					</Button>
					<Text>
						Page {pageInfo.currentPage} of {pageInfo.lastPage}
					</Text>
					<Button
						onClick={() => handlePageChange(page + 1)}
						isDisabled={!pageInfo.hasNextPage}
					>
						Next
					</Button>
				</HStack>
			</VStack>

			<Modal isOpen={isOpen} onClose={onClose} size="xl">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{selectedAnime?.title.romaji}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Image
							src={selectedAnime?.coverImage.large}
							alt={selectedAnime?.title.romaji}
							mb={4}
						/>
						<Text mb={2}>
							<strong>English Title:</strong> {selectedAnime?.title.english}
						</Text>
						<Text mb={2}>
							<strong>Genres:</strong> {selectedAnime?.genres.join(", ")}
						</Text>
						<Text mb={2}>
							<strong>Average Score:</strong> {selectedAnime?.averageScore}
						</Text>
						<Text mb={2}>
							<strong>Description:</strong>
						</Text>
						<Text
							dangerouslySetInnerHTML={{ __html: selectedAnime?.description }}
						/>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Container>
	);
}
