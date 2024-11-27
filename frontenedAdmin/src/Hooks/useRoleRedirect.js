import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {isAdminLoading} from '../store/selectors/isAdminLoading';
import {isUserLoading} from '../store/selectors/isUserLoading';
const useRoleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    const currentPath = window.location.pathname;

    if ((isAdminLoading) && role === 'admin' && currentPath.startsWith('/user')) {
      alert("Access denied: Admin cannot access User routes. Please log out first.");
      navigate('/admin'); // Redirect to Admin landing page
    } else if (isUserLoading  && role === 'user' && currentPath.startsWith('/admin')) {
      alert("Access denied: User cannot access Admin routes. Please log out first.");
      navigate('/user'); // Redirect to User landing page
    }
  }, [navigate]);
};

export default useRoleRedirect;
