import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navLinkClass = 'text-slate-200 hover:text-white transition';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-slate-950 border-b border-white/10 sticky top-0 z-10">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold text-cyan-400">NestFinder</Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className={navLinkClass}>Home</Link>
          <Link to="/properties" className={navLinkClass}>Listings</Link>
          <Link to="/" className={navLinkClass}>Agents</Link>
          <Link to="/" className={navLinkClass}>Contact</Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-slate-300">Hi, {user.name}</span>
              <button onClick={logout} className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-400 text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 rounded-md border border-white/15 text-white hover:bg-white/5">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
