import { useState } from 'react';
import axios from 'axios';
import { redirect } from 'react-router-dom';

import './App.css';

export default function App() {
  const [userId, setUserId] = useState('');
  const [userPass, setUserPass] = useState('');

  let jwt_localStorage = window.localStorage;

  // jwt
  // header
  // .
  // payload
  // .
  // signature

  const URL = (action) => {
    return `https://pre-onboarding-selection-task.shop/auth/${action}`;
  };

  const redirectHandler = () => {
    // window.location.href = '/todo';
    window.location.replace('todo');
  };

  const localStorageNullChecker = () => {
    if (localStorage.getItem('jwt_access_token') === null) {
      return 0;
    } else {
      return redirectHandler();
    }
  };

  localStorageNullChecker();

  const loginHandler = () => {
    axios
      .post(URL('signup'), {
        email: userId,
        password: userPass,
      })
      .then((res) => {
        // 검증하고 첫 입력일 때 회원가입 관련
        // jwt를 로컬 스토리지에 저장하고 로그인 상태로 /todo 보내기

        // console.log(res);
        jwt_localStorage.setItem('jwt_access_token', res.data.access_token);

        redirectHandler();
      })
      .catch((err) => {
        // 에러를 이용해서 써도 될까 싶기는 한데...

        // 에러인 경우
        // 1 => 최소 값이 제대로 안 갔을 때
        // eg) 비밀번호가 8자리가 안되거나...
        // 2 => 이미 회원 가입 되었을 때
        // 로그인 관련으로보내기

        // console.warn(err);
        axios
          .post(URL('signin'), {
            email: userId,
            password: userPass,
          })
          .then((res) => {
            // console.log(res);
            jwt_localStorage.setItem('jwt_access_token', res.data.access_token);
            redirectHandler();
          })
          .catch((err) => {
            // console.log(err.request);
            // console.log(err);
            alert('회원정보 확인해주세요');
          });
      });
  };

  const buttonHandler = () => {
    return userPass.length >= 8 && userId.match(/@/g).length === 1;
  };

  return (
    <div className="App">
      <main>
        <section>
          <label htmlFor="loginID">ID</label>
          <input
            placeholder="아이디를 입력해주세요"
            type="email"
            id="loginID"
            onChange={(e) => setUserId(e.target.value.trim())}
            required
          />
          <br />
          <label htmlFor="loginPassword">PassWord</label>
          <input
            placeholder="비밀번호를 입력해주세요"
            type="password"
            id="loginPassword"
            minLength={8}
            maxLength={16}
            onChange={(e) => setUserPass(e.target.value)}
            required
          />
          <br />
          <input
            type="submit"
            value="로그인"
            disabled={buttonHandler() ? false : true}
            onClick={loginHandler}
          />
        </section>
      </main>
    </div>
  );
}
