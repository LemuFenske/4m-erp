'use client'

import { useEffect, useState } from 'react';
import NavBar from "@/components/NavBar/NavBar";
import OrderList from "@/components/OrderList/OrderList";

export default function OrdersPage() {
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
      <NavBar className=''/>
      <div className="h-28"></div>
      <OrderList className=''/>
      <div className="h-10"></div>
    </div>
  );
}

