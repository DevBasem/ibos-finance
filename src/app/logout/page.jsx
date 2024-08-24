"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        // Remove the token from cookies
        Cookies.remove('token');

        // Redirect to the login page
        router.replace('/login');
    }, [router]);

    return null;
};

export default Logout;