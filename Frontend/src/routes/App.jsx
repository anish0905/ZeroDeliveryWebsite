
import '../App.css'
import { Footer } from '../Component/Footer'
import NavBar1 from '../Component/NavBar/NavBar1'
import {Outlet} from 'react-router-dom'
import FetchItem from '../Component/FetchItem'
import {useSelector} from 'react-redux'
import LoadingSpinner from '../Component/LoadingSpinner';
import ScrollButton from '../Component/scrollToTop'



function App() {   
  const fetchStatus=useSelector(store=>store.fetchStatus);

  return (
    <>
      <NavBar1 />
      <FetchItem/>
      {
        fetchStatus.currentlyFetching? <LoadingSpinner/>:<Outlet/>
      }
      <Footer/>
      <ScrollButton/>
    </>
  )
}

export default App