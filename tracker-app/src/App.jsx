import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ShowProject from './components/chatapp';
import './App.css';
import Signup from './login/sign_up';

const apiUrl = import.meta.env.VITE_BACKEND_ADD;

function App() {
  const [sign, setSign] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState(null);
  const [password, setPassword] = useState(true);


  useEffect(() => {
    const check_auth = async () => {
      try {
        const response = await fetch(`${apiUrl}/remember/user`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        if (response.ok && data.user?.id) {
          setUserId(data.user.id);
          setData(data.user);
          setSign(false);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    check_auth();
  }, [sign]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 text-lg font-medium animate-pulse">Loading, please wait…</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {sign ? (
          <>
          <Route path="/reset-password" element={<Signup setSign={setSign} setPassword={setPassword} password={false}/>} />
          <Route path="*" element={<Signup setSign={setSign} setPassword={setPassword} password={true}/>} />
          </>
        ) : (
          <>
            {/* Main profile route */}
            <Route path="/profile/:userId" element={<ShowProject login_userId={userId} data={data}/>} />

            {/* Fallback redirect if path is / or any unknown */}
            <Route
              path="*"
              element={
                userId ? <Navigate to={`/profile/${userId}`} replace /> : <Navigate to="/login" replace />
              }
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
