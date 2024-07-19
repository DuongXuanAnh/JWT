import { useEffect } from 'react'
import  Header  from './components/layout/header'
import { Outlet } from 'react-router-dom'


function App() {

  useEffect(() => {

    

  }, [])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
