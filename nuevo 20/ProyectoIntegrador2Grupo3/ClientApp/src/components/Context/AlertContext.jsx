
import React, { createContext, useContext, useState } from 'react'
import Alert from '../Alert/Alert';

const AlertContext = createContext();
export const useAlert = () => useContext(AlertContext)

export const AlertProvider = ({children}) => {
    const [alert, setAlert] = useState({type: "", message: ""});

    const showAlert = (type, message) => {
        setAlert({ type, message})

        setTimeout(() => {
            setAlert({ type: "", message: "" })
        }, 3000)
    }

    return (
        <AlertContext.Provider value={{showAlert}}>
            {alert.message && 
                <Alert type={alert.type} message={alert.message} />
            }
            {children}
        </AlertContext.Provider>
    )
}

export default AlertContext