import { Menu } from '@headlessui/react'

const LanguagePickDropDown = () => {
 const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
 }

 return (
  <Menu as="div" className="relative inline-block text-left">
   <Menu.Button
    className="inline-flex items-center justify-center px-4 py-2 text-sm text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
    <img src="/icons/en-us.icon.svg" className="w-5 h-5 mr-2 rounded-full"/>
    English (US)
   </Menu.Button>

   <Menu.Items
    className="absolute  z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
    <div className="py-2">
     <Menu.Item>
      {({active}) => (
       <a href="#"
          className={classNames(
           active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
           'block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
          )}
          role="menuitem">
        <div className="inline-flex items-center">
         <img src="/icons/en-us.icon.svg" aria-hidden="true" className="h-3.5 w-3.5 rounded-full mr-2"
              id="flag-icon-css-de"/>
         English (US)
        </div>
       </a>
      )}
     </Menu.Item>
     <Menu.Item>
      {({active}) => (
       <a href="#"
          className={classNames(
           active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
           'block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
          )}
          role="menuitem">
        <div className="inline-flex items-center">
         <img src="/icons/de-gr.icon.svg" aria-hidden="true" className="h-3.5 w-3.5 rounded-full mr-2"
              id="flag-icon-css-de"/>
         Deutsch (DE)
        </div>
       </a>
      )}
     </Menu.Item>
    </div>
   </Menu.Items>
  </Menu>
 )
}

export default LanguagePickDropDown
