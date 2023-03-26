export default function Home () {
 return (
  <></>
 )
}

export async function getStaticProps () {
 return {
  redirect: {
   destination: '/want-to-read',
   permanent: true,
  },
 }
}
