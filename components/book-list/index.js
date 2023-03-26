import { Fragment } from 'react'
import Link from 'next/link'

export default function BookList ({data, collectionType = ''}) {
 return (
  <Fragment>
   {data?.length > 0 && data?.map((book) => {
    return (<div key={book.bookId}
                 className="flex-shrink max-w-full w-full sm:w-1/3 lg:w-1/4 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
     <div className="flex flex-row sm:block hover-img">
      <Link href={`/book/edit/${book.bookId}`}>
       <img className="max-w-full	w-full mx-auto object-contain sm:h-24 h-48" src="/next.svg" alt="book title"/>
      </Link>
      <div className="py-0 sm:py-3 pl-3 sm:pl-0">
       <h3 className="text-lg font-bold leading-tight mb-2">
        <Link href={`/book/edit/${book.bookId}`}>{book.title}</Link>
       </h3>
       <p className="hidden md:block text-gray-600 leading-tight mb-1">{book.author} <span
        className="hidden md:inline-block text-gray-400 leading-tight mb-1">, {book.date} </span></p>
       <span
        className="text-gray-500 inline-block h-3 border-l-2 border-red-600 mr-2"></span>{collectionType}
      </div>
     </div>
    </div>)
   })}
  </Fragment>
 )
}
