import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from '@/components/common/core/navbar'

export default function Document () {
 return (
  <Html lang="en">
   <Head>
    <title>Good Read clone</title>
    <meta name="description" content="Good Read Clone"/>
    <meta name="application-name" content="Good Read"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
   </Head>
   <body>
   <Main/>
   <NextScript/>
   </body>
  </Html>
 )
}
