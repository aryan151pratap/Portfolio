import React, { useEffect, useState } from 'react';
import PasswordInput from './pass';

const apiUrl = import.meta.env.VITE_BACKEND_ADD;

function Login({ setSign }) {
  const [form, setForm] = useState({
	email: '',
	password: '',
  });

  const handleChange = (e) => {
	setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
	e.preventDefault();

	try {
	  const response = await fetch(`${apiUrl}/auth/login`, {
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
	}
  };

  

  return (
	<>
	<h2 className="text-3xl font-bold text-zinc-900 mb-6">Login Account</h2>
		<form onSubmit={handleSubmit} className="space-y-5">		  
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
			Login
		  </button>
		</form>
		
	</>
  );
}

export default Login;
