import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_BACKEND_ADD;

export default function RequestReset({ setPassword }) {
  const [searchParams] = useSearchParams();
  const new_email = searchParams.get("email");
  const setPasswordFlag = searchParams.get("setPassword");
  const [status, setStatus] = useState(null);

  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async function(){
    try{
      const res = await fetch(`${apiUrl}/password/send-mail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({email}),
      })
    } catch (err){
      console.log(err);
    }
  }

  const handleChangePassword = async function(){
    try{
      const res = await fetch(`${apiUrl}/password/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({email: new_email, formData}),
      })
      const status = await res.json();
      if(res.ok){
        setStatus(status.message);
      }
    } catch (err){
      console.log(err);
    }
  }

  

  return (
    <div className="bg-white p-4 rounded ">
      {!setPasswordFlag ? (
      <form onSubmit={handleSubmit} style={{ maxWidth: 360 }} className="w-full">
        <h2 className="mb-3 capitalize">Forgot password</h2>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          className="outline rounded text-black focus:outline-balck focus:outline-2"
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width:"100%", padding:8, margin:"8px 0" }}
        />
        <button type="submit" className="ml-auto bg-black/80 p-1 px-3 rounded text-white cursor-pointer">Send reset link</button>
        <div style={{ marginTop:10 }}>{msg}</div>
      </form>
      )
      :
      (
        <div className="">
          <form className="flex flex-col gap-4 p-6" onSubmit={handleChangePassword}>
            <h1 className="text-xl font-bold mb-4">Reset Password</h1>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="border rounded p-2"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border rounded p-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Password
            </button>
          </form>
        </div>
      )}
      {status &&
        <div className="p-2 text-green-400">
          {status}
        </div>
      }
      <button
        className="w-full flex justify-end text-blue-500 hover:underline"
        onClick={() => setPassword(true)}
      >
        sign_in
      </button>
    </div>
  );
}
