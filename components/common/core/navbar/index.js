import Link from 'next/link'
import Tabs from '@/components/common/core/tabs'

const Navbar = () => {
 return (<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
  <div className="container flex flex-wrap items-center justify-between mx-auto">
   <Link href="/" className="flex items-center">
    <img src="/goodreads_logo.svg" className="h-6 mr-3 sm:h-9" alt="Good Read Logo"/>
   </Link>
   <div className="flex items-center md:order-2">
    <button type="button" data-dropdown-toggle="language-dropdown-menu"
            className="inline-flex items-center justify-center px-4 py-2 text-sm text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
     <img
      src="/en-us.svg"
      alt="English Language"
      className="w-5 h-5 mr-2 rounded-full"
     />
     English (US)
    </button>
    <div
     className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
     id="language-dropdown-menu">
     <ul className="py-2" role="none">
      <li>
       <Link href="#"
             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
             role="menuitem">
        <div className="inline-flex items-center">
         <img
          src="/en-us.svg"
          alt="English Language"
          className="h-3.5 w-3.5 rounded-full mr-2"
         />
         English (US)
        </div>
       </Link>
      </li>
      <li>
       <Link href="#"
             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
             role="menuitem">
        <div className="inline-flex items-center">
         <img
          src="/en-us.svg"
          alt="English Language"
          className="h-3.5 w-3.5 rounded-full mr-2"
         />
         Urdu (Roman)
        </div>
       </Link>
      </li>
     </ul>
    </div>
    <button data-collapse-toggle="mobile-menu-language-select" type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-language-select" aria-expanded="false">
     <span className="sr-only">Open main menu</span>
     <svg className="w-6 h-6" fill="currentColor" aria-hidden="true" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"></path>
     </svg>
    </button>
   </div>
   <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="mobile-menu-language-select">
    <ul
     className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
     <li>
      <Link href="/want-to-read"
            className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
            aria-current="page">Home</Link>
     </li>
     <li>
      <Link href="/about"
            className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</Link>
     </li>
    </ul>
   </div>
  </div>
 </nav>)
}

export default Navbar
