import './App.css';
import React, { useEffect, useState } from 'react';
import Popup from './components/Popup/Popup';

const App = () => {
  const [url, setUrl] = useState(window.location.pathname);
  
  const handleClick = () => {
    window.history.pushState({}, '', '/form');
    const popStateEvent = new PopStateEvent('popstate', {});
    dispatchEvent(popStateEvent);
  };
  
  useEffect(() => {
    window.addEventListener('popstate', function (e) {
      setUrl(window.location.pathname);
    });
    return window.removeEventListener('popstate', null);
  });
  
  
  return (
    <div className='App'>
      {url === '/' && (
        <>
          <h1>Хотите связаться с нами?</h1>
          <button onClick={handleClick}>Связаться</button>
        </>
      )}
      {url === '/form' && (
        <>
          <Popup/>
        </>
      )}
      {url === '/error' && (
        <>
          <h1>Произошла ошибка, попробуйсте позже</h1>
        </>
      )}
      {url === '/success' && (
        <>
          <h1>Успешно отправленно</h1>
        </>
      )}
    </div>
  );
};

export default App;
