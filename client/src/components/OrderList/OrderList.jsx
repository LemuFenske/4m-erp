// OrderList.js
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaPencilAlt, FaCheck, FaTimes } from 'react-icons/fa';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3002/');
      // Ordenar las órdenes por ID de manera descendente
      const sortedOrders = response.data.sort((a, b) => b.id - a.id);
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleUpdateField = async (id, field) => {
    try {
      const response = await axios.put(`http://localhost:3002/${id}`, { [field]: !orders.find(order => order.id === id)[field] });
      if (response.status === 200) {
        // Crear una nueva lista de órdenes con los campos actualizados
        const updatedOrders = orders.map(order => {
          if (order.id === id) {
            return { ...order, [field]: !order[field] };
          }
          return order;
        });
        // Ordenar las órdenes por ID de manera descendente después de la actualización
        const sortedUpdatedOrders = updatedOrders.sort((a, b) => b.id - a.id);
        setOrders(sortedUpdatedOrders);
      } else {
        console.error('Error updating field:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating field:', error);
    }
  };

  return (
    <div className="">
      <div className='flex'>
        <table className="w-full rounded-lg shadow-md mx-10">
          <thead>
            <tr className="bg-gray-200 text-gray-700 font-bold">
              <th className="border border-gray-300 text-xs px-2 py-1">-</th>
              <th className="border border-gray-300 text-xs px-2 py-1">Prod.</th>
              <th className="border border-gray-300 text-xs px-2 py-1">Cantidad</th>
              <th className="border border-gray-300 text-xs px-2 py-1">Cliente</th>
              <th className="border border-gray-300 text-xs px-2 py-1">Fecha</th>
              <th className="border border-gray-300 text-xs px-2 py-1">Canal</th>
              <th className="border border-gray-300 text-xs px-2 py-1">Col_Tapa</th>
              <th className="border border-gray-300 text-xs px-2 py-1">Tip_Base</th>
              <th className="border border-gray-300 text-xs px-2 py-1">Col_Base</th>
              <th className="border border-gray-300 text-xs px-2 py-1">Tam</th>
              <th className="border border-gray-300 text-xs px-2 py-1">Mat</th>
              <th className="border border-gray-300 text-xs text-center px-2 py-1">Arm</th>
              <th className="border border-gray-300 text-xs text-center px-2 py-1">Rep</th>
              <th className="border border-gray-300 text-xs text-center px-2 py-1">Lus</th>
              <th className="border border-gray-300 text-xs text-center px-2 py-1">Emb</th>
              <th className="border border-gray-300 text-xs text-center px-2 py-1">Des</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="bg-gray-100">
                <td className="border border-gray-300 pl-2 py-1">
                  <Link href={`/OrderDetailPage/${order.id}`}>
                    <div className='hover:text-blue-500 rounded'><FaPencilAlt /></div>
                  </Link>
                </td>
                <td className="border border-gray-300 text-xs px-2 py-1">{order.nombreProducto}</td>
                <td className="border border-gray-300 text-xs px-2 py-1">{order.cantidad}</td>
                <td className="border border-gray-300 text-xs px-2 py-1">{order.cliente}</td>
                <td className="border border-gray-300 text-xs px-2 py-1">{order.fecha}</td>
                <td className="border border-gray-300 text-xs px-2 py-1">{order.canalVenta}</td>
                <td className="border border-gray-300 text-xs px-2 py-1">{order.colorTapa}</td>
                <td className="border border-gray-300 text-xs px-2 py-1">{order.tipoBase || '-'}</td>
                <td className="border border-gray-300 text-xs px-2 py-1">{order.colorBase || '-'}</td>
                <td className="border border-gray-300 text-xs px-2 py-1">{order.tamaño}</td>
                <td className="border border-gray-300 text-xs px-2 py-1">{order.material}</td>
                <td className="border border-gray-300 text-xs text-center px-2 py-1">
                  <button onClick={() => handleUpdateField(order.id, 'armada')} className="rounded px-2 py-1">
                    {order.armada ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />}
                  </button>
                </td>
                <td className="border border-gray-300 text-xs text-center px-2 py-1">
                  <button onClick={() => handleUpdateField(order.id, 'repasada')} className="rounded px-2 py-1">
                    {order.repasada ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />}
                  </button>
                </td>
                <td className="border border-gray-300 text-xs text-center px-2 py-1">
                  <button onClick={() => handleUpdateField(order.id, 'lustrada')} className="rounded px-2 py-1">
                    {order.lustrada ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />}
                  </button>
                </td>
                <td className="border border-gray-300 text-xs text-center px-2 py-1">
                  <button onClick={() => handleUpdateField(order.id, 'embalada')} className="rounded px-2 py-1">
                    {order.embalada ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />}
                  </button>
                </td>
                <td className="border border-gray-300 text-xs text-center px-2 py-1">
                  <button onClick={() => handleUpdateField(order.id, 'despachada')} className="rounded px-2 py-1">
                    {order.despachada ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='text-white'>.</div>
      </div>
    </div>
  );
};

export default OrderList;



    


//     <div class="container mx-auto my-8 px-10">
//   <table class="w-full bg-white rounded-lg shadow-md mr-10">
//     <thead>
      // <tr class="bg-gray-200 text-gray-700 font-bold">
      //   <th class="py-3 px-4 text-left">-</th>
      //   <th class="py-3 px-4 text-left">Producto</th>
      //   <th class="py-3 px-4 text-left">Cliente</th>
      //   <th class="py-3 px-4 text-left">Fecha</th>
      //   <th class="py-3 px-4 text-left">Canal</th>
      //   <th class="py-3 px-4 text-left">Col_Tapa</th>
      //   <th class="py-3 px-4 text-left">Tip_Base</th>
      //   <th class="py-3 px-4 text-left">Col_Base</th>
      //   <th class="py-3 px-4 text-left">Tamaño</th>
      //   <th class="py-3 px-4 text-left">Material</th>
      //   <th class="py-3 px-4 text-left">Armada</th>
      //   <th class="py-3 px-4 text-left">Repasada</th>
      //   <th class="py-3 px-4 text-left">Lustrada</th>
      //   <th class="py-3 px-4 text-left">Embalada</th>
      //   <th class="py-3 px-4 text-left">Despachada</th>
      // </tr>
//     </thead>
//     <tbody>
//       {orders.map(order => (
//         <tr key={order.id} class="border-b border-gray-200 hover:bg-gray-100">
//           <td class="py-3 px-4">
//             <Link href={`/OrderDetailPage/${order.id}`}>
//               <div class="hover:text-blue-500 rounded">
//                 <FaPencilAlt />
//               </div>
//             </Link>
//           </td>
//           <td class="py-3 px-4">{order.nombreProducto}</td>
//           <td class="py-3 px-4">{order.cliente}</td>
//           <td class="py-3 px-4">{order.fecha}</td>
//           <td class="py-3 px-4">{order.canalVenta}</td>
//           <td class="py-3 px-4">{order.colorTapa}</td>
//           <td class="py-3 px-4">{order.tipoBase || '-'}</td>
//           <td class="py-3 px-4">{order.colorBase || '-'}</td>
//           <td class="py-3 px-4">{order.tamaño}</td>
//           <td class="py-3 px-4">{order.material}</td>
//           <td class="py-3 px-4">
//             <button onClick={() => handleUpdateField(order.id, 'armada')} class="rounded px-2 py-1">
//               {order.armada ? <FaCheck class="text-green-500" /> : <FaTimes class="text-red-500" />}
//             </button>
//           </td>
//           <td class="py-3 px-4">
//             <button onClick={() => handleUpdateField(order.id, 'repasada')} class="rounded px-2 py-1">
//               {order.repasada ? <FaCheck class="text-green-500" /> : <FaTimes class="text-red-500" />}
//             </button>
//           </td>
//           <td class="py-3 px-4">
//             <button onClick={() => handleUpdateField(order.id, 'lustrada')} class="rounded px-2 py-1">
//               {order.lustrada ? <FaCheck class="text-green-500" /> : <FaTimes class="text-red-500" />}
//             </button>
//           </td>
//           <td class="py-3 px-4">
//             <button onClick={() => handleUpdateField(order.id, 'embalada')} class="rounded px-2 py-1">
//               {order.embalada ? <FaCheck class="text-green-500" /> : <FaTimes class="text-red-500" />}
//             </button>
//           </td>
//           <td class="py-3 px-4">
//             <button onClick={() => handleUpdateField(order.id, 'despachada')} class="rounded px-2 py-1">
//               {order.despachada ? <FaCheck class="text-green-500" /> : <FaTimes class="text-red-500" />}
//             </button>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>