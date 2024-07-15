import { Button } from "../ui/button"
import { Table } from "../Table"

import {
  Link
} from "react-router-dom";

const SourcesHomePage = () => {
  return (
    <>
      <div>
        {/* <Button variant="outline" onClick={handleCreateSourceClick}>Get started</Button>  */}
        <Button asChild>
          <Link to="/create-source">Create New Data Source</Link>
        </Button>
      </div>
      <Table cols={[]} rows={["Name", "Type"]} />
    </>
  )

}

export default SourcesHomePage