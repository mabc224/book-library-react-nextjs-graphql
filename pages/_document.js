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
   <div className="flex flex-col">
    <div className="shadow border-b-2">

     <header>
      <Navbar/>
     </header>

    </div>
    <div className="h-full flex overflow-hidden">
     <main className="overflow-y-auto focus:outline-none w-full z-0 bg-gray-100">
      <Main/>
     </main>
    </div>
   </div>

   <NextScript/>
   </body>
  </Html>
 )
}
