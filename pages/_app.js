import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '@/lib/apollo-client'

export default function App ({Component, pageProps}) {
 // Use the layout defined at the page level, if available
 const getLayout = Component.getLayout || ((page) => page)
 return (
  <ApolloProvider client={apolloClient}>
   {
    getLayout(<Component {...pageProps} />)
   }
  </ApolloProvider>
 )
}
