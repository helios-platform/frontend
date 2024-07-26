import './App.css'

import SideNav from './components/SideNav'
import SQLConsole from './components/SQLConsole'
import CreateNewSource from './components/createDataSource/CreateNewSource';
import ViewSources from './components/createDataSource/ViewSources';
import QuarantineTablePage from './components/QuarantineTablePage';


import {
  Switch,
  Route
} from "react-router-dom";

import { IntegrationProvider } from './contexts/IntegrationContext';


function App() {
  return (
    <>
      <IntegrationProvider>
        <div className="w-screen"> 
          <SideNav />
          <div className="lg:pl-72 py-10" >
              <div className="px-4 sm:px-6 lg:px-8">
                <Switch>
                  <Route path="/sql-dashboard">
                    <SQLConsole />
                  </Route>
                  <Route path="/datasource-create">
                    <CreateNewSource />
                  </Route>
                  <Route path="/datasource-view">
                    <ViewSources />
                  </Route>
                  <Route path="/quarantine-table">
                    <QuarantineTablePage />
                  </Route>
                </Switch>
              </div>
          </div>
        </div>
      </IntegrationProvider>
    </>
  )
}

export default App
