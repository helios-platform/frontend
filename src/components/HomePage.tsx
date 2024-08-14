import { Link } from 'react-router-dom';
import '../Home.scss'

const HomePage = () => {
  return (
    <>
      <div className="star-animation-container">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="logo" className='flex justify-center mt-72 mb-20'>
          <img
            alt="Helios"
            src="./images/orangehelios.png"
            className="h-1/4 w-1/4 object-contain"
          />
        </div>
        <div id="title" className="flex justify-center mb-16">
          <p className="text-base pt-8 font-bold">Real-Time Data Stream Query Engine</p>
        </div>
        <div className="flex justify-center gap-8">
          <Link to="/sql-dashboard" className="w-48 px-4 py-2 text-center bg-indigo-800 text-white rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                SQL Console
          </Link>
          <Link to="/datasource-create" className="w-48 px-4 py-2 text-center bg-indigo-800 text-white rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Add Data Source
          </Link>
        </div>
      </div>
    </>
  )
}

export default HomePage;