
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Link from 'next/link';

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
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-zinc-100 mb-10 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Editar Orden</h2>
      <div className="grid grid-cols-1 gap-4">
        {[
          { label: 'Producto', name: 'nombreProducto', value: order.nombreProducto },
          { label: 'Cantidad', name: 'cantidad', value: order.cantidad },
          { label: 'Cliente', name: 'cliente', value: order.cliente },
          { label: 'Canal', name: 'canalVenta', value: order.canalVenta },
          { label: 'Color Tapa', name: 'colorTapa', value: order.colorTapa },
          { label: 'Tipo Base', name: 'tipoBase', value: order.tipoBase },
          { label: 'Color Base', name: 'colorBase', value: order.colorBase },
          { label: 'Tamaño', name: 'tamaño', value: order.tamaño },
          { label: 'Material', name: 'material', value: order.material }
        ].map(({ label, name, value }) => (
          <div key={name} className="flex items-center">
            <label className="block text-sm font-medium text-gray-700 w-32">{label}:</label>
            <input
              type="text"
              name={name}
              value={value}
              onChange={handleInputChange}
              className="ml-2 mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={handleSaveChanges}
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          Guardar
        </button>
        <button
          onClick={() => setDeleteModalIsOpen(true)}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Borrar Orden
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Edit Successful"
        className="flex justify-center items-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="bg-white p-8 rounded-md shadow-md max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Editado correctamente</h2>
          <div className="flex justify-end space-x-4">
            <Link href="/OrdersPage">
              <div className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Volver al listado</div>
            </Link>
            <button
              onClick={() => setModalIsOpen(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            >
              Seguir editando
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={() => setDeleteModalIsOpen(false)}
        contentLabel="Delete Confirmation"
        className="flex justify-center items-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="bg-white p-8 rounded-md shadow-md max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Confirmar eliminación</h2>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleDeleteOrder}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Confirmar
            </button>
            <button
              onClick={() => setDeleteModalIsOpen(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OrderDetail;


