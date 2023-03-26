import { ApolloClient, InMemoryCache } from '@apollo/client'
import process from 'next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss'

const apolloClient = new ApolloClient({
 uri: `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
 cache: new InMemoryCache(),
})

export default apolloClient
