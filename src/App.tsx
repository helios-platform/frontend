import './App.css'
// import { useState } from 'react'
import SideNav from './components/SideNav'
import SQLConsole from './components/SQLConsole'
import {
  Switch,
  Route
} from "react-router-dom";


function App() {

  return (
    <>
      <div className="w-screen"> 
        <SideNav />
        
        {/* Main container div*/}
        <div className="lg:pl-72 py-10" >
            <div className="px-4 sm:px-6 lg:px-8">
              <Switch>
                <Route path="/sql-dashboard">
                  <SQLConsole />
                </Route>
                <Route path="/add-datasource">
                  <p>Route worked</p>
                </Route>
              </Switch>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
