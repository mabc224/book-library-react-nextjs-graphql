import Router from 'next/router'
import { ApolloClient, InMemoryCache, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
import process from 'next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss'

const uri = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`
const httpLink = new createUploadLink({uri})

const errorLink = onError(({graphQLErrors, networkError}) => {
 if (graphQLErrors) {
  graphQLErrors.forEach(({message, locations, path}) =>
   console.log(
    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
   )
  )
  for (let err of graphQLErrors) {
   switch (err?.extensions?.code) {
    case 'UNAUTHENTICATED':
     Router.push('/auth/login')
   }
  }
 }

 if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authLink = (authToken) => setContext((_, {headers}) =>
 ({
  headers: {
   ...headers,
   authorization: authToken ? authToken : ''
  }
 })
)

const apolloClient = new ApolloClient({
 uri,
 cache: new InMemoryCache(),
 link: from([errorLink, httpLink]),
})

export default apolloClient
