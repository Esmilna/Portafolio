import React from 'react';
import { Route, Routes} from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import { AlertProvider } from './components/Context/AlertContext';
import { AuthenticationProvider } from './components/Context/AuthenticationContext';

export default function App (){
  return (
    <AuthenticationProvider>
      <Layout>
        <AlertProvider>
            <Routes>
              {AppRoutes.map((route, index) => {
                const { element, ...rest } = route;
                return <Route key={index} {...rest} element={element} />;
              })}
            </Routes>
        </AlertProvider>
      </Layout>
    </AuthenticationProvider>
  );
}
