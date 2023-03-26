import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Tabs = ({items = [], matchUrl = ''}) => {
 const router = useRouter()
 const classLink = 'whitespace-no-wrap mx-8 py-4 px-1 border-b-2 border-transparent font-medium text-md leading-5 text-black hover:text-gray-400 hover:border-gray-400'
 const classLinkActive = 'whitespace-no-wrap mx-8 py-4 px-1 border-b-2 border-white font-medium text-md leading-5 text-black'
 const isHighlight = (menu) => {
  return router.pathname?.indexOf(menu) >= 0
 }

 return (
  <div className="block bg-white overflow-x-auto">
   <div className="border-b w-full border-black-200">
    <nav className="-mb-px flex justify-center">
     {
      items.map((item, index) => (
       <Link key={index}
             className={`${isHighlight(item.value) ? classLinkActive : classLink}`}
             href={matchUrl + item.path}>{item.label}</Link>
      ))
     }
    </nav>
   </div>
  </div>
 )
}

export default Tabs
