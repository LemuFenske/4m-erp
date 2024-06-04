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
        <div className="w-3/4 mx-auto mt-8 p-6 bg-gray-100 rounded-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Crear Orden de Compra</h1>
            <form onSubmit={handleSubmit}>
                <div className='flex'>
                    <div className="mb-4 mx-2 w-1/2">
                        <label className="block text-sm font-medium text-gray-700">
                            Producto: <span className="text-red-500">*</span>
                        </label>
                        <input type="text" name="nombreProducto" value={formData.nombreProducto} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                    </div>
                    <div className="mb-4 mx-2 w-1/2">
                        <label className="block text-sm font-medium text-gray-700">
                            Cantidad: <span className="text-red-500">*</span>
                        </label>
                        <input type="text" name="cantidad" value={formData.cantidad} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                    </div>
                    <div className="mb-4 mx-2 w-1/2">
                        <label className="block text-sm font-medium text-gray-700">
                            Cliente: <span className="text-red-500">*</span>
                        </label>
                        <input type="text" name="cliente" value={formData.cliente} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                    </div>
                </div>
                <div className='flex'>
                    <div className="mb-4 mx-2 w-1/2">
                        <label className="block text-sm font-medium text-gray-700">
                            Canal: <span className="text-red-500">*</span>
                        </label>
                        <input type="text" name="canalVenta" value={formData.canalVenta} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                    </div>
                    <div className="mb-4 mx-2 w-1/2">
                        <label className="block text-sm font-medium text-gray-700">
                            Color de Tapa: <span className="text-red-500">*</span>
                        </label>
                        <input type="text" name="colorTapa" value={formData.colorTapa} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                    </div>
                </div>
                <div className='flex'>
                    <div className="mb-4 mx-2 w-1/2">
                        <label className="block text-sm font-medium text-gray-700">Tipo de Base:</label>
                        <input type="text" name="tipoBase" value={formData.tipoBase} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                    </div>
                    <div className="mb-4 mx-2 w-1/2">
                        <label className="block text-sm font-medium text-gray-700">Color de Base:</label>
                        <input type="text" name="colorBase" value={formData.colorBase} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                    </div>
                </div>
                <div className='flex'>
                    <div className="mb-4 mx-2 w-1/2">
                        <label className="block text-sm font-medium text-gray-700">
                            Tamaño: <span className="text-red-500">*</span>
                        </label>
                        <input type="text" name="tamaño" value={formData.tamaño} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                    </div>
                    <div className="mb-4 mx-2 w-1/2">
                        <label className="block text-sm font-medium text-gray-700">
                            Material: <span className="text-red-500">*</span>
                        </label>
                        <input type="text" name="material" value={formData.material} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                    </div>
                </div>
                <div className='w-full text-center'>
                    <button 
                        type="submit" 
                        className={`py-2 px-4 rounded-md mx-auto ${isFormValid() ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`} 
                        disabled={!isFormValid()}>
                        Crear Orden
                    </button>
                </div>
            </form>
            {showModal && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-blue-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 flex items-center justify-center text-center sm:mt-0 sm:ml-4 sm:text-center w-full">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <FiCheckCircle className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                        <h3 className="text-lg ml-2 font-medium text-gray-900">Orden creada exitosamente</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-blue-50 px-4 py-3 sm:px-6 sm:flex sm:justify-between">
                                <Link href="/OrdersPage">
                                    <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                        Volver al listado
                                    </button>
                                </Link>
                                <button onClick={handleCloseModal} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                     Crear otra orden
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
