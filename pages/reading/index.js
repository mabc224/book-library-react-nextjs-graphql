import { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import DashboardLayout from '@/components/layout/dashboard-layout'
import BookList from '@/components/book-list'

const GET_USER_BOOKS = gql`
  query userBooks($collection: Collection!) {
    userBooks(collection: $collection) {
      bookId
      userId
      title
      author
      date
      rating
      collection
      cover
    }
  }
`

export default function Reading () {
 const [userBooks, setUserBooks] = useState([])

 const {data} = useQuery(GET_USER_BOOKS, {variables: {collection: 'READING'}})

 useEffect(() => {
  setUserBooks(data?.userBooks)
 }, [data])

 return (
  <div className="flex flex-row flex-wrap justify-center -mx-3">
   <BookList data={userBooks} collectionType={'Reading'} />
  </div>
 )
}

Reading.getLayout = function getLayout (page) {
 return (
  <DashboardLayout>
   {page}
  </DashboardLayout>
 )
}
