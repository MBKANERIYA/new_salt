import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Router from './Router';  

const Layout = () => {
  const location = useLocation();

  const hideHeaderFooter = location.pathname === '/cart' || location.pathname === '/login-success' ||location.pathname === '/login'||location.pathname === '/gift'||location.pathname === '/payment'|| location.pathname === '/shipping' || location.pathname === '/adashbord' || location.pathname.startsWith('/112/admin');

  return (
    <div>
      {!hideHeaderFooter && <Header />}
      <div>
        <Router />
      </div>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default Layout;
