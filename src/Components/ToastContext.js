import { createContext, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const showToast = (message, type = "info") => {
        toast[type](message);
    };

    return (
        <>
            <ToastContext.Provider value={showToast}>
                {children}
            </ToastContext.Provider>
            <ToastContainer />
        </>
    );
};

export const useToast = () => useContext(ToastContext);
