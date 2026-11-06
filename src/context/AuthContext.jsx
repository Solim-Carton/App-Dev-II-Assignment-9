import { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext(null);

// Export custom hook for easy access
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// AuthProvider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  

  // Check if user is authenticated
  const isAuthenticated = user !== null;

  // Login function - simulates API call
  const login = (username, password, role = 'regular') => {
    // In a real app, you'd send credentials to an API
    // For now, we accept any username/password combination
    
    // Simulate creating a JWT token
    const mockToken = `mock_jwt_token_${Date.now()}`;
    
    // Create user object
    const userData = {
      username: username,
      role: role,
      token: mockToken
    };
    
    // Store in state
    setUser(userData);
    
    // In a real app, you might also store the token in localStorage
    localStorage.setItem('authToken', mockToken);
    
    return userData;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  // Check if user has a specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Context value that will be available to all children
  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    hasRole,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}