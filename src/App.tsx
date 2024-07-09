import './App.css'
// import { useState } from 'react'
import SideNav from './components/SideNav'
import SQLConsole from './components/SQLConsole'


function App() {

  return (
    <>
      <div className="w-screen"> 
        <SideNav />
        
        {/* Main container div*/}
        <div className="lg:pl-72 py-10" >
            <div className="px-4 sm:px-6 lg:px-8">
              <SQLConsole />
            </div>
        </div>
      </div>
    </>
  )
}

export default App
