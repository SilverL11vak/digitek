import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../state/AuthContext';

export default function RegisterPage() {
  const { register, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={handleSubmit} aria-label="Registration form">
        <h2 style={{ marginTop: 0, marginBottom: 12 }}>Join Digitek</h2>
        <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>
          Create and sell beautiful sticker designs with a Figma-like editor.
        </p>
        <div className="auth-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-text">{error}</div>}
        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? 'Creating account…' : 'Sign up'}
        </button>
        <Link to="/login" className="secondary-btn" style={{ textAlign: 'center', textDecoration: 'none' }}>
          Already have an account? Sign in
        </Link>
      </form>
    </div>
  );
}

