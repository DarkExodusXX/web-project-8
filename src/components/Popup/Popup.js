import React, { useEffect, useState } from 'react';
import ErrorMessages from '../ErrorMessages/ErrorMessges';
import './popup.css';

const Popup = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [message, setMessage] = useState(localStorage.getItem('message') || '');
  const [isChecked, setIsChecked] = useState(localStorage.getItem('isChecked') === 'true' || false);
  const fetchUrl = 'https://formcarry.com/s/nUdcDnvBy-';
  
  const isFormValid = () => {
    const nameError = "Имя должно состоять только из русских букв";
    const checkedError = "Вы должны согласится с политикой обработки персональных данных";
    const messageError = "Сообщение не должно быть пустым";
    const errorsArr = [...errors];
    
    if (!(/^[а-я]+$/i.test(username))) {
      if (!errorsArr.includes(nameError)) {
        errorsArr.push(nameError);
        setErrors(errorsArr);
      }
    } else {
      if (errorsArr.includes(nameError)) {
        errorsArr.splice(errors.indexOf(nameError), 1);
      }
    }
    if (!isChecked) {
      if (!errorsArr.includes(checkedError)) {
        errorsArr.push(checkedError);
        setErrors(errorsArr)
      }
    } else {
      if (errorsArr.includes(checkedError)) {
        errorsArr.splice(errors.indexOf(checkedError), 1);
      }
    }
    if (message.length === 0) {
      if (!errorsArr.includes(messageError)) {
        errorsArr.push(messageError);
        setErrors(errorsArr)
      }
    } else {
      if (errorsArr.includes(messageError)) {
        errorsArr.splice(errors.indexOf(messageError), 1);
      }
    }
    setErrors(errorsArr);
    return errorsArr;
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid().length > 0) return;
    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        message,
        isChecked
      })
    }).then((response) => {
      if (response.status === 200) {
        localStorage.clear();
        window.history.pushState(null, '', '/success');
        const popStateEvent = new PopStateEvent('popstate', {});
        dispatchEvent(popStateEvent);
      } else {
        window.history.pushState(null, '', '/error');
        const popStateEvent = new PopStateEvent('popstate', {});
        dispatchEvent(popStateEvent);
      }
    }).catch((e) => {
      console.log(e);
    });
    
  };
  
  useEffect(() => {
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('message', message);
    localStorage.setItem('isChecked', isChecked.toString());
  }, [username, email, message, isChecked, errors]);
  
  return (
    <div>
      <div className='b-popup'>
        <div className='b-popup-content'>
          <h2>Заполните форму обратной связи</h2>
          <ErrorMessages errors={errors}/>
          <form className='container' onSubmit={handleSubmit}>
            <div className='from-item'>
              <input
                type='text'
                placeholder='Имя'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className='from-item'>
              <input
                type='email'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className='from-item'>
              <textarea
                rows='10'
                placeholder='Ваше сообщение'
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </div>
            <div className='from-item'>
              <div className='checkbox-control'>
                <input
                  type='checkbox'
                  onChange={(e) => setIsChecked(e.target.checked)}
                  checked={isChecked}
                /><span>Согласен с политикой обработки персональных данных</span>
              </div>
            </div>
            <button type='submit'>Отправить</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Popup;
