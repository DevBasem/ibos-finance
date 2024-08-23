import Cookies from 'js-cookie';

export function useAuth() {
  const getAuthStatus = () => {
    const token = Cookies.get('token');
    return !!token;
  };

  return {
    isAuthenticated: getAuthStatus(),
  };
}