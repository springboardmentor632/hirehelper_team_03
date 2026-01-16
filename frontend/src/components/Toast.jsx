import React, { createContext, useContext, useState, useCallback } from "react";
import { FiCheck, FiX, FiAlertCircle, FiInfo } from "react-icons/fi";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now() + Math.random();
    const toast = { id, message, type, duration };
    
    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback((message, duration) => {
    return showToast(message, "success", duration);
  }, [showToast]);

  const error = useCallback((message, duration) => {
    return showToast(message, "error", duration);
  }, [showToast]);

  const info = useCallback((message, duration) => {
    return showToast(message, "info", duration);
  }, [showToast]);

  const warning = useCallback((message, duration) => {
    return showToast(message, "warning", duration);
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, success, error, info, warning, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

const ToastItem = ({ toast, onRemove }) => {
  const { id, message, type } = toast;

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-500 dark:bg-green-600 text-white";
      case "error":
        return "bg-red-500 dark:bg-red-600 text-white";
      case "warning":
        return "bg-yellow-500 dark:bg-yellow-600 text-white";
      default:
        return "bg-blue-500 dark:bg-blue-600 text-white";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FiCheck size={20} />;
      case "error":
        return <FiAlertCircle size={20} />;
      case "warning":
        return <FiAlertCircle size={20} />;
      default:
        return <FiInfo size={20} />;
    }
  };

  return (
    <div
      className={`${getToastStyles()} px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-[400px] pointer-events-auto animate-fade-in`}
      role="alert"
    >
      {getIcon()}
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onRemove(id)}
        className="hover:opacity-70 transition-opacity"
        aria-label="Close toast"
      >
        <FiX size={18} />
      </button>
    </div>
  );
};

