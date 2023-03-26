import { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import DashboardLayout from '@/components/layout/dashboard-layout'
import BookList from '@/components/book-list'

const GET_USER_BOOKS = gql`
  query userBooks($userId: ID!, $collection: Collection!) {
    userBooks(userId: $userId, collection: $collection) {
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

export default function WantToRead () {
 const [userBooks, setUserBooks] = useState([])

 const {data} = useQuery(GET_USER_BOOKS, {variables: {userId: 1, collection: 'WANT_TO_READ'}})

 useEffect(() => {
  setUserBooks(data?.userBooks)
 }, [data])

 return (
  <div className="flex flex-row flex-wrap justify-center -mx-3">
   <BookList data={userBooks} collectionType={'Want To Read'} />
  </div>
 )
}

WantToRead.getLayout = function getLayout (page) {
 return (
  <DashboardLayout>
   {page}
  </DashboardLayout>
 )
}
