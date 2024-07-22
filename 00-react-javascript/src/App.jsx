import { useContext, useEffect } from 'react'
import  Header  from './components/layout/header'
import { Outlet } from 'react-router-dom'
import { AuthContext } from './components/context/auth.context';
import axios from './util/axios.customize';
import { Spin } from 'antd';


function App() {

  const {setAuth, appLoading, setAppLoading} = useContext(AuthContext);

  useEffect(() => {

    setAppLoading(true);

    const fetchAccount = async () => {
        const res = await axios.get(`/v1/api/account`);
        if(res){
            setAuth({
                isAuthenticated: true,
                user: {
                    email: res?.email ?? "",
                    name: res?.name ?? "",
                    role: res?.role ?? ""
                },
            });
        }

      setAppLoading(false);
    };

    fetchAccount();


  }, [])

  return (
    <>
    {appLoading ? 
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }}><Spin /></div>
    : 
    <>
    <Header />
    <Outlet />
    </>
    }
   
    </>
  )
}

export default App
