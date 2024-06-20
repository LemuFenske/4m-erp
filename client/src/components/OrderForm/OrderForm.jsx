'use client'

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FiCheckCircle } from 'react-icons/fi';

export default function OrderForm() {
    const [formData, setFormData] = useState({
        nombreProducto: '',
        cantidad: '',
        cliente: '',
        canalVenta: '',
        colorTapa: '',
        tipoBase: '',
        colorBase: '',
        tamaño: '',
        material: ''
    });

    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3002/', formData);
            if (response.status === 200) {
                setShowModal(true);
                setFormData({
                    nombreProducto: '',
                    cantidad: '',
                    cliente: '',
                    canalVenta: '',
                    colorTapa: '',
                    tipoBase: '',
                    colorBase: '',
                    tamaño: '',
                    material: ''
                });
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const isFormValid = () => {
        return (
            formData.nombreProducto &&
            formData.cantidad &&
            formData.cliente &&
            formData.canalVenta &&
            formData.colorTapa &&
            formData.tamaño &&
            formData.material
        );
    };

     return (
    <div className="w-11/12 mx-auto mt-8 bg-gray-100 border border-gray-300 shadow-lg mb-10">
      <h1 className="text-2xl font-bold mb-4 text-center border-gray-400 bg-gray-300 py-4 shadow-md">CREAR PEDIDO</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap m-6">
          <div className="mb-4 p-2 w-full md:w-1/2 lg:w-1/3 ">
            {/* <label className="block text-sm font-medium text-gray-700">
              Producto: <span className="text-red-500">*</span>
            </label> */}
            <input
              type="text"
              name="nombreProducto"
              value={formData.nombreProducto}
              onChange={handleChange}
              placeholder="Producto: *"
              className="mt-1 p-2 border border-gray-300 shadow-md w-full"
            />
          </div>
          <div className="mb-4 p-2 w-full md:w-1/2 lg:w-1/3">
            {/* <label className="block text-sm font-medium text-gray-700">
              Cliente: <span className="text-red-500">*</span>
            </label> */}
            <input
              type="text"
              name="cliente"
              value={formData.cliente}
              onChange={handleChange}
              placeholder="Cliente: *"
              className="mt-1 p-2 border border-gray-300 shadow-md w-full"
            />
          </div>
          <div className="mb-4 p-2 w-full md:w-1/2 lg:w-1/3">
            {/* <label className="block text-sm font-medium text-gray-700">
              Canal: <span className="text-red-500">*</span>
            </label> */}
            <input
              type="text"
              name="canalVenta"
              value={formData.canalVenta}
              onChange={handleChange}
              placeholder="Canal de venta: *"
              className="mt-1 p-2 border border-gray-300 shadow-md w-full"
            />
          </div>
          <div className="mb-4 p-2 w-full md:w-1/2 lg:w-1/3">
            {/* <label className="block text-sm font-medium text-gray-700">
              Cantidad: <span className="text-red-500">*</span>
            </label> */}
            <input
              type="text"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              placeholder="Cantidad: *"
              className="mt-1 p-2 border border-gray-300 shadow-md w-full"
            />
          </div>
          <div className="mb-4 p-2 w-full md:w-1/2 lg:w-1/3">
            {/* <label className="block text-sm font-medium text-gray-700">
              Tamaño: <span className="text-red-500">*</span>
            </label> */}
            <input
              type="text"
              name="tamaño"
              value={formData.tamaño}
              onChange={handleChange}
              placeholder="Tamaño: *"
              className="mt-1 p-2 border border-gray-300 shadow-md w-full"
            />
          </div>
          <div className="mb-4 p-2 w-full md:w-1/2 lg:w-1/3">
            {/* <label className="block text-sm font-medium text-gray-700">
              Material: <span className="text-red-500">*</span>
            </label> */}
            <input
              type="text"
              name="material"
              value={formData.material}
              onChange={handleChange}
              placeholder="Material: *"
              className="mt-1 p-2 border border-gray-300 shadow-md w-full"
            />
          </div>
          <div className="mb-4 p-2 w-full md:w-1/2 lg:w-1/3">
            {/* <label className="block text-sm font-medium text-gray-700">
              Color de Tapa: <span className="text-red-500">*</span>
            </label> */}
            <input
              type="text"
              name="colorTapa"
              value={formData.colorTapa}
              onChange={handleChange}
              placeholder="Color: *"
              className="mt-1 p-2 border border-gray-300 shadow-md w-full"
            />
          </div>
          <div className="mb-4 p-2 w-full md:w-1/2 lg:w-1/3">
            {/* <label className="block text-sm font-medium text-gray-700">
              Tipo de Base:
            </label> */}
            <input
              type="text"
              name="tipoBase"
              value={formData.tipoBase}
              onChange={handleChange}
              placeholder="Tipo de Base:"
              className="mt-1 p-2 border border-gray-300 shadow-md w-full"
            />
          </div>
          <div className="mb-4 p-2 w-full md:w-1/2 lg:w-1/3">
            <input
                type="text"
                name="colorBase"
                value={formData.colorBase}
                onChange={handleChange}
                placeholder="Color de la base:"
                className="mt-1 p-2 border border-gray-300 shadow-md w-full"
            />
          </div>
        </div>

        <div className="w-full text-center">
          <button
            type="submit"
            className={`py-2 px-4  shadow-lg mb-6 mx-auto ${isFormValid() ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
            disabled={!isFormValid()}
          >
            CREAR
          </button>
        </div>
      </form>

      {showModal && (
  <div className="fixed inset-0 z-10 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>


      <div className="inline-block bg-gray-100 text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full max-w-md">
        <div className="bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex">
            <div className="mt-3 flex items-center justify-center text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-200 sm:mx-0 sm:h-10 sm:w-10">
                <FiCheckCircle className="h-6 w-6 text-green-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg ml-2 font-medium text-gray-900">PEDIDO CREADO</h3>
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
            onClick={handleCloseModal}
            type="button"
            className="mt-3 w-full inline-flex justify-center shadow-sm px-4 py-2 bg-green-600 text-white hover:bg-green-700 sm:mt-0 sm:w-auto"
          >
            CREAR OTRO PEDIDO
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );

}
