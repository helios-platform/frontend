## Overview

## Changes
- Added QuarantineTablePage component
- Added QuarantineTablePage route to App.tsx
- Added QuarantineTablePage link on SideNav.tsx
- Added SQLConsole logic and table components to QuarantineTablePage component
- Removed Database dropdown
- Removed ability to view quarantine tables from SQLDashboard page - delete data.quarantine

## Notes to Reviewers
- TODO
  - Update QuarantineTablePage logic to only show quarantine tables from Quarantine database - need to do full refresh of docker image, etc
  - Adjust folder structure to have page components within Page folder and remove 'Page' from QuarantineTablePage component.
  - Update highlighting in SideNav to highlight current page on refresh
  - 