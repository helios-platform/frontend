import './App.css'
import { useState } from 'react'
import { Resizable } from './components/Resizable'
import { Nav } from './components/Nav'

function App() {
  const [ isCollapsed, setIsCollapsed ] = useState(false)
  const [ links, setLinks ] = useState([
    {title: 'SQL Console'},
    {title: 'Add Data Source'}
  ])
  
  // interface NavProps {
  //   isCollapsed: boolean
  //   links: {
  //     title: string
  //     label?: string
  //     icon: LucideIcon
  //     variant: "default" | "ghost"
  //   }[]
  // }
  

  return (
    <>
      <Nav isCollapsed={isCollapsed} links={links} />
      {/* <Resizable /> */}
    </>
  )
}

export default App
