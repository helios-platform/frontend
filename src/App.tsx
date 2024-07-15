import './App.css'
import SourcesHomePage from './components/createDataSource/SourcesHomePage';
import SideNav from './components/SideNav'
import SQLConsole from './components/SQLConsole'
import CreateNewSource from './components/createDataSource/CreateNewSource';

import {
  Switch,
  Route
} from "react-router-dom";
import InputSourceDetails from './components/createDataSource/InputSourceDetails';


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
                <Route path="/datasource-dashboard">
                  <SourcesHomePage />
                </Route>
                <Route path="/create-source">
                  <CreateNewSource />
                </Route>
                {/* <Route path="/input-source-details">
                  <InputSourceDetails />
                </Route>
                <Route path="/input-source-details">
                  <InputSourceDetails />
                </Route> */}
              </Switch>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
