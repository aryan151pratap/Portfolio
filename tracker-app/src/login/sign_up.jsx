import React, { useEffect, useState } from 'react';
import Login from './login_page';
import Bubble from '../components/animation/bubble';
import Logo from '../components/logo/logo';
import PasswordInput from './pass';

const apiUrl = import.meta.env.VITE_BACKEND_ADD;

function Signup({ setSign }) {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/auth/sign_up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        setSign(false);
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while signing up');
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <>
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center p-4 overflow-hidden">
      
      <div className=''>
        <Bubble/>
      </div>
      
    <div className="bg-white rounded-md shadow-lg p-8 w-full max-w-md">
    <div className='flex flex-row items-center mb-5'>
      <Logo/>
      <h1 className='text-2xl font-bold'>Achievement</h1>
    </div>
    {!login ?
    <div className='flex flex-col'>
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
			  placeholder='Enter username'
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-700"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
			        placeholder='Enter email'
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-700"
            />
          </div>

          <PasswordInput form={form} handleChange={handleChange}/> 

          
          <button
            type="submit"
            className="w-full bg-zinc-800 text-white py-2 rounded-lg hover:bg-zinc-900 transition-colors"
          >
            {loading ?
              <div className="flex justify-center items-center h-fit bg-white dark:bg-gray-900">
                <div className="w-6 h-6 border-4 border-white border-dashed rounded-full animate-spin"></div>
              </div>
              :
              <span>
                Create Account
              </span>
            }
          </button>
          
        </form>
        </div>
        :
        <Login setSign={setSign}/>
        }
        <div className='flex flex-col mt-4' >
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          
          <div className='p-2 items-center flex justify-center gap-2'>

            <p className='text-zinc-700 font-semibold'>{login ? 'Create Account' : 'Already have Account'}</p>

            <button className='text-blue-500 hover:underline hover:font-bold'
            onClick={() => setLogin(!login)}
            >
              {login ? 'Sign_up' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Signup;
