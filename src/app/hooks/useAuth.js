import Cookies from 'js-cookie';

export function useAuth() {
  const getAuthStatus = () => {
    const token = Cookies.get('token');
    return !!token; // Returns true if token exists, otherwise false
  };

  return {
    isAuthenticated: getAuthStatus(),
  };
}