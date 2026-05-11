import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'remixicon/fonts/remixicon.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-loading-skeleton/dist/skeleton.css'; // Import skeleton styles
import { Provider } from 'react-redux';
import store from './Store/Store';

// Prevent Bootstrap modals from permanently locking body scroll during SPA navigation
const observer = new MutationObserver(() => {
  if (document.body.style.overflow === 'hidden') {
    document.body.style.overflow = '';
  }
  if (document.body.style.paddingRight) {
    document.body.style.paddingRight = '';
  }
});
observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
