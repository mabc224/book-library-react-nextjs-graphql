import { useRouter } from 'next/router'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import toast, { Toaster } from 'react-hot-toast'
import ReactStars from "react-rating-stars-component";
import apolloClient from '@/lib/apollo-client'

const options = [
 {value: 'READ', label: 'READ'},
 {value: 'READING', label: 'READING'},
 {value: 'WANT_TO_READ', label: 'WANT TO READ'},
]

const ModifyBookMutation = gql`
  mutation modifyBook($bookId: ID!, $title: String!, $author: String!, $file: File, $date: String!, $collection: Collection, $rating: Int) {
    modifyBook(
      bookId: $bookId
      title: $title
      author: $author
      file: $file
      date: $date
      collection: $collection
      rating: $rating
    ) {
      bookId
      userId
      title
      date
      rating
      collection
      cover
      rating
    }
  }
`

export default function Edit (props) {
 const router = useRouter()
 const { bookId } = router.query
 const {userBook} = props;

 const {control, handleSubmit, reset} = useForm({
  defaultValues: {
   bookId,
   title: userBook.title,
   author: userBook.author,
   date: userBook.date,
   file: '',
   collection: {label: userBook.collection.split('_'), value: userBook.collection},
   rating: 0
  }
 })

 const [modifyBook, { loading, error }] = useMutation(ModifyBookMutation, {
  onCompleted: () => {
   reset()
   router.push('/want-to-read')
  }
 })
 const onSubmit = data => {
  const { bookId, title, author, file, date, collection, rating} = data;
  const variables = {bookId, title, author, file, date, collection: collection.value, rating};

  try {
   toast.promise(modifyBook({ variables }), {
    loading: 'Modifying book..',
    success: 'Book successfully modified!🎉',
    error: `Something went wrong 😥 Please try again -  ${error}`,
   })
  } catch (error) {
   console.error(error)
  }
 }

 return (
  <div className="relative h-full bg-gray-100">
   <div className="bg-white">
    <div className="relative flex flex-col justify-center">
     <div
      className="w-full p-6 m-auto bg-white rounded-md lg:max-w-xl">
      <Toaster />
      <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
       Edit Book
      </h1>
      <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
       <div className="mb-2">
        <label
         htmlFor="title"
         className="block text-sm font-semibold text-gray-800"
        >
         Title
        </label>
        <Controller
         name="title"
         rules={{ required: true }}
         control={control}
         render={({field}) => <input {...field}
                                     type="text"
                                     className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
         />}
        />

       </div>
       <div className="mb-2">
        <label
         htmlFor="author"
         className="block text-sm font-semibold text-gray-800"
        >
         Author
        </label>
        <Controller
         name="author"
         rules={{ required: true }}
         control={control}
         render={({field}) => <input {...field}
                                     type="text"
                                     className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
         />}
        />
       </div>
       <div className="mb-2">
        <label
         htmlFor="date"
         className="block text-sm font-semibold text-gray-800"
        >
         Date
        </label>
        <Controller
         name="date"
         control={control}
         render={({field}) => <input {...field}
                                     type="date"
                                     className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
         />}
        />
       </div>
       <div className="mb-2">
        <label
         htmlFor="cover"
         className="block text-sm font-semibold text-gray-800"
        >
         Cover
        </label>
        <Controller
         name="file"
         control={control}
         render={({field}) => <input {...field}
                                     type="file"
                                     className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
         />}
        />
       </div>
       <div className="mb-2">
        <label
         className="block text-sm font-semibold text-gray-800"
        >
         Collection
        </label>
        <Controller
         name="collection"
         control={control}
         render={({field}) => <Select {...field} instanceId="collection-select-options" options={options}
                                      className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40">
         </Select>}
        />

       </div>
       <div className="mb-2">
        <label
         className="block text-sm font-semibold text-gray-800"
        >
         Rating
        </label>
        <Controller
         name="rating"
         control={control}
         render={({field}) => <ReactStars {...field} count={5}
          size={24}
          activeColor="#ffd700"
         />}
        />

       </div>
       <div className="mt-6">
        <button type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
         Update
        </button>
       </div>
      </form>
     </div>
    </div>
   </div>
  </div>
 )
}

const GET_USER_BOOK = gql`
  query userBook($userId: ID!, $bookId: ID!) {
    userBook(userId: $userId, bookId: $bookId) {
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

export async function getServerSideProps(context) {
 const { bookId } = context.query;
 const { data } = await apolloClient.query({
  query: GET_USER_BOOK,
  variables: {userId: 1, bookId }
 })
 console.log(data?.userBook)

  return {
  props: data, // will be passed to the page component as props
 }
}
