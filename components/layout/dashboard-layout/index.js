'use client'
import Tabs from '@/components/common/core/tabs'

const initTabs = [
 {label: 'Want to Read', value: 'want-to-read', path: '/want-to-read'},
 {label: 'Reading', value: 'reading', path: '/reading'},
 {label: 'Read', value: 'read', path: '/read'}
];

export default function DashboardLayout({children}) {
 return (
  <div className="relative h-screen bg-gray-100">
   <div className="bg-white py-6">
    <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
     <div className="flex flex-row flex-wrap">
      <div className="flex-shrink max-w-full w-full overflow-hidden">
       <div className="w-full py-3">
        <Tabs items={initTabs}/>
       </div>
        {children}
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}
