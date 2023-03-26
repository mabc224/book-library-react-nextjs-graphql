import DashboardLayout from '@/components/layout/dashboard-layout'

export default function Read () {
 return (
  <div className="flex flex-row flex-wrap justify-center -mx-3">
   <div
    className="flex-shrink max-w-full w-full sm:w-1/3 lg:w-1/4 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
    <div className="flex flex-row sm:block hover-img">
     <a href="">
      <img className="max-w-full w-full mx-auto object-contain h-48" src="/next.svg" alt="book title"/>
     </a>
     <div className="py-0 sm:py-3 pl-3 sm:pl-0">
      <h3 className="text-lg font-bold leading-tight mb-2">
       <a href="#">5 Tips to Save Money Booking Your Next Hotel Room</a>
      </h3>
      <p className="hidden md:block text-gray-600 leading-tight mb-1">Robert Cecil Martin <span
       className="hidden md:inline-block text-gray-400 leading-tight mb-1">, 2008 </span></p>
      <a className="text-gray-500" href="#"><span
       className="inline-block h-3 border-l-2 border-red-600 mr-2"></span>Want To Read</a>
     </div>
    </div>
   </div>
  </div>
 )
}

Read.getLayout = function getLayout (page) {
 return (
  <DashboardLayout>
   {page}
  </DashboardLayout>
 )
}
