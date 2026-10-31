import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 p-8 rounded-2xl bg-slate-900 border border-white/10">
      <h2 className="text-3xl font-bold text-white mb-6">Welcome back</h2>
      {error && <div className="mb-4 rounded bg-red-500/10 text-red-300 p-3">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
            required
          />
        </div>

        <button type="submit" className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold">
          Login
        </button>
      </form>
    </div>
  );
}
