import React, { createContext, useContext, forwardRef } from 'react';
import Toast from 'react-native-toast-message';

const ToastContext = createContext();

const ForwardedToast = forwardRef((props, ref) => <Toast ref={ref} {...props} />);

export const ToastProvider = ({ children }) => (
    <ToastContext.Provider value={{}}>
        {children}
        <ForwardedToast />
    </ToastContext.Provider>
);

export const useToast = () => {
    return useContext(ToastContext);
};
