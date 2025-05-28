import { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );
  const [token, setTokenState] = useState<string | null>(
    localStorage.getItem('token')
  );

  const setToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    setTokenState(token);
  };

  const setUserWrapper = (user: User | null) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    setUser(user);
  };

  const logout = () => {
    setToken(null);
    setUserWrapper(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, setUser: setUserWrapper, setToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
