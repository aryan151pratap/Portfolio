import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // or use your preferred icons

function PasswordInput({ form, handleChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <label className="block text-gray-700 mb-1 font-semibold">Password</label>
      <input
        type={showPassword ? 'text' : 'password'}
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Enter password"
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-700 pr-10"
      />
      <span
        className="absolute right-3 top-9 cursor-pointer text-gray-600"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </span>
    </div>
  );
}

export default PasswordInput;