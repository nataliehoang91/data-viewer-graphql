"use client";

import InfoGrid from "@/components/InfoGrid";
import Pagination from "@/components/Pagination";
import { gql, useQuery } from "@apollo/client";
import { Box, Container, Heading, useColorModeValue } from "@chakra-ui/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

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

const InformationPageLayout = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const page = Number(searchParams.get("page")) || 1;
	const params = useParams();
	const infoId = Number(params.id);

	const { loading, error, data } = useQuery(GET_ANIME, {
		variables: { page, perPage: ITEMS_PER_PAGE },
		skip: !page,
	});

	const handlePageChange = (newPage: number) => {
		if (newPage <= pageInfo.lastPage && newPage >= 1) {
			router.push(`/information?page=${newPage}`);
		}
	};

	const openAnimeModal = (animeId: number) => {
		if (animeId) {
			router.push(`/information/overview/${animeId}?page=${page}`);
		}
	};

	if (error) return <p>Error: {error.message}</p>;

	const media = data?.Page?.media || [];
	const pageInfo = data?.Page?.pageInfo || {};

	const bgColor = useColorModeValue("gray.50", "gray.900");
	const textColor = useColorModeValue("gray.800", "white");

	return (
		<Box bg={bgColor} minHeight="100vh" py={10}>
			<Container maxW="container.xl">
				<Heading
					as="h1"
					size="2xl"
					textAlign="center"
					mb={10}
					color={textColor}
				>
					Anime Explorer
				</Heading>
				{children}
				<InfoGrid
					loading={loading}
					media={media}
					openAnimeModal={openAnimeModal}
					infoId={infoId}
				/>
				<Box mt={10}>
					<Pagination
						page={page}
						lastPage={pageInfo.lastPage}
						loading={loading}
						onPageChange={handlePageChange}
					/>
				</Box>
			</Container>
		</Box>
	);
};

export default InformationPageLayout;
