import { useState, useEffect } from 'react';
import ShowProject from './components/chatapp';
import './App.css';
import Signup from './login/sign_up';

const apiUrl = import.meta.env.VITE_BACKEND_ADD;

function App() {

  const [sign, setSign] = useState(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const check_auth = async function(){
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/remember/user`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setData(data.user);
          setSign(false);
        } 
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    check_auth();
  }, [sign])

  return (
    <>
    {loading ?
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 text-lg font-medium animate-pulse">Loading, please wait…</p>
        </div>
      </div>

    :
      <div>
      {sign ?
        <Signup setSign={setSign}/>
        :
        <ShowProject data={data}/>
      }
      </div>
    }
    </>
  );
}

export default App;
