export type AnimeData = {
	id: number;
	title: {
		romaji: string;
		english?: string;
	};
	coverImage: {
		large: string;
	};
	description: string;
	genres: string[];
	averageScore?: number;
	siteUrl: string;
};
