"use client";

import AnimeCard from "@/components/AnimeCard";
import SkeletonCard from "@/components/SkeletonCard";
import { getServerCookie as getCookie } from "@/utils/cookiesActions";
import { gql, useQuery } from "@apollo/client";
import {
	Box,
	Button,
	Container,
	HStack,
	Image,
	Link,
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
	useToast,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
        siteUrl
      }
    }
  }
`;

const ITEMS_PER_PAGE = 12;

const InformationPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const page = Number(searchParams.get("page")) || 1;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedAnime, setSelectedAnime] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const toast = useToast();

	useEffect(() => {
		const checkAuth = async () => {
			const userName = await getCookie("userName");
			const jobTitle = await getCookie("jobTitle");
			if (!userName || !jobTitle) {
				toast({
					title: "Authentication required",
					description: "Please sign in to view this page.",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
				router.push("/");
			} else {
				setIsAuthenticated(true);
			}
		};
		checkAuth();
	}, [router, toast]);

	const { loading, error, data } = useQuery(GET_ANIME, {
		variables: { page, perPage: ITEMS_PER_PAGE },
		skip: !isAuthenticated,
	});

	const handlePageChange = (newPage: number) => {
		router.push(`/information?page=${newPage}`);
	};

	const openAnimeModal = (anime) => {
		setSelectedAnime(anime);
		onOpen();
	};

	if (!isAuthenticated) {
		return null;
	}

	if (error) return <Text>Error: {error.message}</Text>;

	const { media = [], pageInfo = {} } = data?.Page || {};

	return (
		<Container maxW="container.xl" py={10}>
			<VStack spacing={6}>
				<Text fontSize="2xl" fontWeight="bold">
					Popular Anime
				</Text>
				<SimpleGrid columns={[1, 2, 3, 4]} spacing={6} w="100%">
					{loading
						? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
								<SkeletonCard key={index} />
							))
						: media.map((anime) => {
								console.log("anime", anime);
								return (
									<AnimeCard
										key={anime.id}
										anime={anime}
										onClick={() => openAnimeModal(anime)}
									/>
								);
							})}
				</SimpleGrid>
				<HStack>
					<Button
						onClick={() => handlePageChange(page - 1)}
						isDisabled={page === 1 || loading}
					>
						Previous
					</Button>
					<Text>
						Page {pageInfo.currentPage || page} of {pageInfo.lastPage || "..."}
					</Text>
					<Button
						onClick={() => handlePageChange(page + 1)}
						isDisabled={!pageInfo.hasNextPage || loading}
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
						<Link
							href={selectedAnime?.siteUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Text mb={2}>
								<strong>English Title:</strong> {selectedAnime?.title.english}
							</Text>
						</Link>
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
};
export default InformationPage;
