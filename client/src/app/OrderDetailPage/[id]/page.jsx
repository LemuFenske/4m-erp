'use client'
import { useEffect, useState } from 'react';
import NavBar from "@/components/NavBar/NavBar";
import OrderDetail from "@/components/OrderDetail/OrderDetail";

export default function OrderDetailPage({ params }) {
  const { id } = params;
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
    <div>
      <NavBar />
      <div className="h-28"></div>
      <OrderDetail id={id} />
    </div>
  );
}
