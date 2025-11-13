import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../lib/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('accessToken', data.accessToken);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-lg bg-white p-8 shadow"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-slate-800">Sign in</h1>
          <p className="text-sm text-slate-500">Access the scheme analytics dashboard</p>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-600">Email</label>
          <input
            className="w-full rounded border border-slate-200 px-3 py-2 focus:border-slate-400 focus:outline-none"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-600">Password</label>
          <input
            className="w-full rounded border border-slate-200 px-3 py-2 focus:border-slate-400 focus:outline-none"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full rounded bg-slate-900 py-2 text-white transition hover:bg-slate-700"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
