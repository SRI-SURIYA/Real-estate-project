import { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nestfinder-user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('nestfinder-token') || '');

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem('nestfinder-token', token);
    } else {
      delete api.defaults.headers.common.Authorization;
      localStorage.removeItem('nestfinder-token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('nestfinder-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nestfinder-user');
    }
  }, [user]);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    setToken(data.token);
    setUser({
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
    });
    return data;
  };

  const register = async (name, email, password, role) => {
    const { data } = await api.post('/auth/register', { name, email, password, role });
    setToken(data.token);
    setUser({
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
    });
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default api;
