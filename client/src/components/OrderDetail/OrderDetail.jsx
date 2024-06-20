
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Link from 'next/link';
import { FiCheckCircle, FiTrash, FiTrash2 } from 'react-icons/fi';

const OrderDetail = ({ id }) => {
  const [order, setOrder] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:3002/${id}`, order);
      if (response.status === 200) {
        setModalIsOpen(true);
      } else {
        console.error('Error updating order');
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleDeleteOrder = async () => {
    try {
      const response = await axios.delete(`http://localhost:3002/${id}`);
      if (response.status === 200) {
        setDeleteModalIsOpen(false);
        window.location.href = '/OrdersPage'; // Redirect to orders page after deletion
      } else {
        console.error('Error deleting order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  if (!order) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="w-11/12 mx-auto mt-8 bg-gray-100 border border-gray-300 shadow-lg mb-10">
      <h2 className="text-2xl font-bold mb-4 text-center border-gray-400 bg-gray-300 py-4 shadow-md">EDITAR PEDIDO</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-6">
        {[
          { label: 'Producto', name: 'nombreProducto', value: order.nombreProducto },
          { label: 'Cliente', name: 'cliente', value: order.cliente },
          { label: 'Canal', name: 'canalVenta', value: order.canalVenta },
          { label: 'Cantidad', name: 'cantidad', value: order.cantidad },
          { label: 'Tamaño', name: 'tamaño', value: order.tamaño },
          { label: 'Material', name: 'material', value: order.material },
          { label: 'Color', name: 'colorTapa', value: order.colorTapa },
          { label: 'Tipo Base', name: 'tipoBase', value: order.tipoBase },
          { label: 'Color Base', name: 'colorBase', value: order.colorBase },
        ].map(({ label, name, value }) => (
          <div key={name} className="flex items-center flex-wrap">
            <label className="block text-sm font-medium text-gray-500 w-full sm:w-32">{label}:</label>
            <input
              type="text"
              name={name}
              value={value}
              onChange={handleInputChange}
              placeholder={label}
              className="mt-1 p-2 border border-gray-300 shadow-md w-full"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-around mt-6">
        <button
          onClick={handleSaveChanges}
          className="bg-green-600 text-white py-2 px-4 hover:bg-green-700 m-6 shadow-lg"
        >
          GUARDAR
        </button>
        <button
          onClick={() => setDeleteModalIsOpen(true)}
          className="bg-red-500 text-white py-2 px-4 hover:bg-red-600 m-6 shadow-lg"
        >
          BORRAR
        </button>
      </div>
  
      <Modal
  isOpen={modalIsOpen}
  onRequestClose={() => setModalIsOpen(false)}
  contentLabel="Edit Successful"
  className="fixed inset-0 z-10 overflow-y-auto"
  overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
>
  <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div className="inline-block bg-gray-100 text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full max-w-md">
      <div className="bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex">
          <div className="mt-3 flex items-center justify-center text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-200 sm:mx-0 sm:h-10 sm:w-10">
              <FiCheckCircle className="h-6 w-6 text-green-600" aria-hidden="true" />
            </div>
            <h3 className="text-lg ml-2 font-medium text-gray-900">PEDIDO EDITADO</h3>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:justify-between pb-5">
        <Link href="/OrdersPage">
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center shadow-sm px-4 py-2 bg-green-600 text-white hover:bg-green-700 sm:mt-0 sm:w-auto"
          >
            VOLVER AL LISTADO
          </button>
        </Link>
        <button
          onClick={() => setModalIsOpen(false)}
          type="button"
          className="mt-3 w-full inline-flex justify-center shadow-sm px-4 py-2 bg-green-600 text-white hover:bg-green-700 sm:mt-0 sm:w-auto"
        >
          SEGUIR EDITANDO
        </button>
      </div>
    </div>
  </div>
</Modal>

  
<Modal
  isOpen={deleteModalIsOpen}
  onRequestClose={() => setDeleteModalIsOpen(false)}
  contentLabel="Delete Confirmation"
  className="fixed inset-0 z-10 overflow-y-auto"
  overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
>
  <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div className="inline-block bg-gray-100 text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full max-w-md">
      <div className="bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex">
          <div className="mt-3 flex items-center justify-center text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-200 sm:mx-0 sm:h-10 sm:w-10">
              <FiTrash2 className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <h3 className="text-lg ml-2 font-medium text-gray-900">CONFIRMAR ELIMINACIÓN</h3>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:justify-between pb-5">
        <button
          onClick={handleDeleteOrder}
          type="button"
          className="mt-3 w-full inline-flex justify-center shadow-sm px-4 py-2 bg-red-600 text-white hover:bg-red-700 sm:mt-0 sm:w-auto"
        >
          CONFIRMAR
        </button>
        <button
          onClick={() => setDeleteModalIsOpen(false)}
          type="button"
          className="mt-3 w-full inline-flex justify-center shadow-sm px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 sm:mt-0 sm:w-auto">
          CANCELAR
        </button>
      </div>
    </div>
  </div>
</Modal>

    </div>
  );
}  

export default OrderDetail;


