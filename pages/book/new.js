import { useRouter } from 'next/router'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import toast, { Toaster } from 'react-hot-toast'
import { useState } from 'react'

const options = [
 {value: 'READ', label: 'READ'},
 {value: 'READING', label: 'READING'},
 {value: 'WANT_TO_READ', label: 'WANT TO READ'},
]

const AddBookMutation = gql`
  mutation addBook($title: String!, $author: String!, $file: File, $date: String!, $collection: Collection) {
    addBook(
      title: $title
      author: $author
      file: $file
      date: $date
      collection: $collection
    ) {
      bookId
      userId
      title
      date
      rating
      collection
      cover
    }
  }
`

export default function New () {
 const router = useRouter()

 const {control, handleSubmit, reset} = useForm({
  defaultValues: {
   title: '',
   author: '',
   date: '',
   file: '',
   collection: options[2]
  }
 })

 const [addBook, { loading, error }] = useMutation(AddBookMutation, {
  onCompleted: () => {
   reset()
   router.push('/want-to-read')
  }
 })

 const [fileData, setFileData] = useState();

 const onSubmit = data => {
  const {title, author, date, collection, rating} = data;
  const variables = {title, author, file: fileData, date, collection: collection.value, rating};

  try {
   toast.promise(addBook({ variables }), {
    loading: 'Adding new book..',
    success: 'Book successfully added!🎉',
    error: `Something went wrong 😥 Please try again -  ${error}`,
   })
  } catch (error) {
   console.error(error)
  }
 }

 const onChange = (e) => {
  const file = e.target.files[0];
  setFileData(file);
 }

 return (
  <div className="relative h-full bg-gray-100">
   <div className="bg-white">
    <div className="relative flex flex-col justify-center">
     <div
      className="w-full p-6 m-auto bg-white rounded-md lg:max-w-xl">
      <Toaster />
      <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
       Add Book
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
        <input onChange={onChange}
               type="file"
               className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
       <div className="mt-6">
        <button type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
         Add
        </button>
       </div>
      </form>
     </div>
    </div>
   </div>
  </div>
 )
}


