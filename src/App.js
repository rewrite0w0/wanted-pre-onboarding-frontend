import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

export default function App() {
  const [userId, setUserId] = useState('');
  const [userPass, setUserPass] = useState('');

  // jwt 구조 header.payload.signature
  let jwt_localStorage = window.localStorage;

  const URL = (action) => {
    return `https://pre-onboarding-selection-task.shop/auth/${action}`;
  };

  const redirectHandler = () => {
    window.location.replace('/todo');
  };

  const localStorageNullChecker = () => {
    if (localStorage.getItem('jwt_access_token') === null) {
      return 0;
    } else {
      return redirectHandler();
    }
  };

  const loginHandler = () => {
    axios
      .post(URL('signup'), {
        email: userId,
        password: userPass,
      })
      .then((res) => {
        jwt_localStorage.setItem('jwt_access_token', res.data.access_token);

        redirectHandler();
      })
      .catch((err) => {
        axios
          .post(URL('signin'), {
            email: userId,
            password: userPass,
          })
          .then((res) => {
            jwt_localStorage.setItem('jwt_access_token', res.data.access_token);
            redirectHandler();
          })
          .catch((err) => {
            alert('회원정보 확인해주세요');
          });
      });
  };

  const buttonHandler = () => {
    if (
      userPass.length >= 8 &&
      userId.split('').filter((el) => el === '@').length === 1
    ) {
      return true;
    } else return false;
  };

  useEffect(() => {
    localStorageNullChecker();
    document.title = '프리온보딩 커리어 챌린지 2022 | 로그인';
  }, []);

  return (
    <div className="App">
      <main className="app__wrap">
        <section>
          <label htmlFor="loginID">ID</label>
          <input
            placeholder="메일을 입력"
            type="email"
            id="loginID"
            className="app__login__id"
            onChange={(e) => setUserId(e.target.value.trim())}
            required
          />

          <label htmlFor="loginPassword">PassWord</label>
          <input
            placeholder="8자리 이상 입력"
            type="password"
            id="loginPassword"
            className="app__login__password"
            minLength={8}
            maxLength={16}
            onChange={(e) => setUserPass(e.target.value)}
            required
          />

          <input
            type="submit"
            value="로그인"
            className="app__login__button"
            disabled={buttonHandler() ? false : true}
            onClick={loginHandler}
          />
        </section>
      </main>
    </div>
  );
}
