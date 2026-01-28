import React, { createContext, useContext, useState } from 'react';
import Snackbar from '../components/Snackbar';

const SnackbarContext = createContext();

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within SnackbarProvider');
  }
  return context;
};

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: '',
    type: 'success',
    duration: 3000
  });

  const showSnackbar = (message, type = 'success', duration = 3000) => {
    setSnackbar({
      isOpen: true,
      message,
      type,
      duration
    });
  };

  const closeSnackbar = () => {
    setSnackbar(prev => ({ ...prev, isOpen: false }));
  };

  const value = {
    showSnackbar,
    success: (message, duration) => showSnackbar(message, 'success', duration),
    error: (message, duration) => showSnackbar(message, 'error', duration),
    warning: (message, duration) => showSnackbar(message, 'warning', duration),
    info: (message, duration) => showSnackbar(message, 'info', duration),
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        isOpen={snackbar.isOpen}
        onClose={closeSnackbar}
        duration={snackbar.duration}
      />
    </SnackbarContext.Provider>
  );
};