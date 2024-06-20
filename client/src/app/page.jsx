'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Modal from 'react-modal';
import amImage from '../components/NavBar/4m-nofondo.png';
import { ThreeDots } from 'react-loader-spinner';
import { AiOutlineClose } from 'react-icons/ai';

const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
    if (isAuthenticated) {
      window.location.href = '/OrdersPage';
    }
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setPassword('');
    setError('');
    setLoading(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      const appPassword = process.env.NEXT_PUBLIC_APP_PASSWORD;
      if (password === appPassword) {
        localStorage.setItem('isAuthenticated', JSON.stringify(true));
        window.location.href = '/OrdersPage';
      } else {
        setLoading(false);
        setError('Contraseña incorrecta');
      }
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <Image src={amImage} alt="Imagen" width={500} height={500} />
        <div className="mt-8 text-center">
          <button 
            onClick={openModal} 
            className="bg-black text-yellow-600 font-bold py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105">
            Iniciar
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Ingrese la contraseña"
        ariaHideApp={false}
        className='flex items-center'
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.80)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          content: {
            position: 'relative',
            width: '300px',
            margin: 'auto',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '0px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }
        }}
      >
        <button 
          onClick={closeModal} 
          className="text-gray-500 hover:text-red-500 transition duration-300 w-full text-end">
          <AiOutlineClose size={20} />
        </button>
        <div className="flex flex-col items-center">
          <h2>Ingrese la contraseña</h2>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="border border-gray-300 shadow-sm mt-4 p-2"
          />
          {error && <p className="text-red-600 mt-2">{error}</p>}
          <div className="mt-4">
            <button 
              onClick={handleSubmit} 
              className="bg-black shadow-md text-yellow-600 font-bold py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <ThreeDots color="#FFF" height={10} width={20} />
              ) : (
                'Enviar'
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;


