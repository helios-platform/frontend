import SideNav from "./components/SideNav";
import SQLConsole from "./components/SQLConsole/SQLConsole";
import CreateNewSource from "./components/createDataSource/CreateNewSource";
import ViewSources from "./components/createDataSource/ViewSources";
import QuarantineTablePage from "./components/QuarantineTablePage";
import { IntegrationProvider } from "./contexts/IntegrationContext";
import HomePage from "./components/HomePage";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-custom-dark-blue">
      <IntegrationProvider>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route>
            <div className="flex">
              <SideNav />
              <div className="flex-1 lg:ml-80 mt-20 lg:mt-0">
                <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
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
          </Route>
        </Switch>
        {/* <div className="w-screen">
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
        </div> */}
      </IntegrationProvider>
    </div>
  );
}

export default App;
