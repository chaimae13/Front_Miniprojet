import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './Context/useAuth';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">

    <UserProvider>
    <Navbar/>
        <Outlet />
         <ToastContainer />
  </UserProvider>
  </div> 
  );
};

export default App;
