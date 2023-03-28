import Router from 'next/router'
import { ApolloClient, InMemoryCache, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
import Cookies from 'universal-cookie'
import { AUTH_TOKEN } from '@/constants'

const uri = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`
const httpLink = new createUploadLink({uri})
const cookies = new Cookies()

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

const authMiddleware = setContext(async (operation, {headers}) => {
 const token = cookies.get(AUTH_TOKEN)

 return {
  headers: {
   ...headers,
   authorization: `Bearer ${token}`
  }
 }
})

const apolloClient = new ApolloClient({
 uri,
 cache: new InMemoryCache(),
 link: from([errorLink, authMiddleware, httpLink]),
})

export default apolloClient
