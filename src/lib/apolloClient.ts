import {
	ApolloClient,
	InMemoryCache,
	type NormalizedCacheObject,
} from "@apollo/client";

export const client = new ApolloClient<NormalizedCacheObject>({
	uri: "https://graphql.anilist.co",
	cache: new InMemoryCache(),
});
