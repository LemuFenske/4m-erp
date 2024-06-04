'use client'
import { useEffect, useState } from 'react';

export default function OrderDetailPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const authStatus = JSON.parse(localStorage.getItem('isAuthenticated'));
    if (!authStatus) {
      window.location.href = '/';
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (isAuthenticated === null) {
    // Optionally, you can add a loading indicator here
    return null;
  }

  return (
    <div>OrderDetailPage</div>
  );
}
