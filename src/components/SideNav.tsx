import {
  BeakerIcon,
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react';

import {
  Link
} from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const navigation = [
  { name: 'SQL Dashboard', to: '/sql-dashboard', icon: HomeIcon, current: true },
  { name: 'Add Data Source', to: '/datasource-create', icon: UsersIcon, current: false },
  { name: 'View Data Sources', to: '/datasource-view', icon: UsersIcon, current: false },
  { name: 'Quarantine Table', to: '/quarantine-table', icon: BeakerIcon, current: false },
]


const SideNav = () => {
  const [selectedPage, setSelectedPage] = useState('/sql-dashboard')

  return ( 
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
          <div className="flex justify-center items-center my-10">
            <img
              alt = "Helios"
              src="./images/newlogo.png"
              className="h-45 w-45 object-contain"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link to={item.to} onClick={()=>setSelectedPage(item.to)}
                        className={classNames(
                          item.to === selectedPage
                            ? 'bg-indigo-700 text-white'
                            : 'text-indigo-200 hover:bg-indigo-700 hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white',
                            'h-6 w-6 shrink-0',
                          )}
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <a
                  href="#"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                >
                  <Cog6ToothIcon
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                  />
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
   );
}
 
export default SideNav;