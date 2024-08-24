import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const isAuthenticated = !!Cookies.get('token'); // Replace 'token' with your cookie key

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login'); // Redirect to login page if not authenticated
      }
    }, [isAuthenticated, router]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default withAuth;