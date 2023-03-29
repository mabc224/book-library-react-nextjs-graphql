import Link from 'next/link'
import Tabs from '@/components/common/core/tabs'
import Navbar from '@/components/common/core/navbar'

const initTabs = [
 {label: 'Want to Read', value: 'want-to-read', path: '/want-to-read'},
 {label: 'Reading', value: 'reading', path: '/reading'},
 {label: 'Read', value: 'read', path: '/read'}
]

export default function DashboardLayout ({children}) {
 return (
  <div className="flex flex-col">
   <div className="shadow border-b-2">
    <header>
     <Navbar/>
    </header>
   </div>
   <div className="h-full flex overflow-hidden">
    <main className="overflow-y-auto focus:outline-none w-full z-0 bg-gray-100">
     <div className="relative bg-gray-100">
      <div className="bg-white py-6">
       <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
        <div className="flex flex-row flex-wrap">
         <div className="flex-shrink max-w-full w-full overflow-hidden">
          <div className="w-full py-3">
           <Link href="/book/new"
                 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-right ">
            Add new book
           </Link>
           <Tabs items={initTabs}/>
          </div>
          {children}
         </div>
        </div>
       </div>
      </div>
     </div>
    </main>
   </div>
  </div>
 )
}
