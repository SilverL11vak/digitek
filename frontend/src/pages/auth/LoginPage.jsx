import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../state/AuthContext';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={handleSubmit} aria-label="Login form">
        <h2 style={{ marginTop: 0, marginBottom: 12 }}>Welcome back</h2>
        <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>
          Sign in to continue designing and selling stickers.
        </p>
        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-text">{error}</div>}
        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        <Link to="/register" className="secondary-btn" style={{ textAlign: 'center', textDecoration: 'none' }}>
          Create an account
        </Link>
      </form>
    </div>
  );
}

