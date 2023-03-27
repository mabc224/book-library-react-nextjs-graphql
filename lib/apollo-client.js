import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from "apollo-upload-client";
import process from 'next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss'

const uri = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`

const apolloClient = new ApolloClient({
 uri,
 cache: new InMemoryCache(),
 link: createUploadLink({uri}),
})

export default apolloClient
