import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './todo.css';

export default function Todo() {
  const [renderTodoItems, setRenderTodoItems] = useState([]);

  const URL = (action) => {
    return `https://pre-onboarding-selection-task.shop/todos/${action}`;
  };

  const redirectHandler = () => {
    window.location.replace('/');
  };

  const localStorageNullChecker = () => {
    if (localStorage.getItem('jwt_access_token') === null) {
      redirectHandler();
    } else {
      return 0;
    }
  };

  localStorageNullChecker();

  // console.log(localStorage.getItem('jwt_access_token'));

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_access_token')}`,
      'Content-Type': 'application/json',
    },
  };
  // console.log(config);

  const data = {
    // id: Math.random(),
    // todo: '과제하기',
    isCompleted: false,
    userId: localStorage.getItem('jwt_access_token'),
  };

  const loadTodoList = () => {
    axios
      .get(URL(''), config)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        setRenderTodoItems(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });

    // console.log(renderTodoItems);
  };

  const inputTodoValue = useRef('');

  const inputTodoHandler = (addTodo) => {
    axios
      .post(URL(''), { todo: addTodo }, config)
      .then((res) => {
        // console.log(res);
        loadTodoList();
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const deleteTodoHandler = (e) => {
    axios
      .delete(URL(e.target.parentElement.id), config)
      .then((res) => {
        // console.log(res);
        loadTodoList();
      })
      .catch((err) => {
        // console.error(err);
      });
  };

  const todoIsComplitedToggle = (e) => {
    axios
      .put(
        URL(e.target.parentElement.id),
        {
          id: e.target.parentElement.id,
          todo: e.target.parentElement.childNodes[0].innerText,
          isCompleted:
            e.target.parentElement.className === 'done' ? false : true,
          userId: localStorage.getItem('jwt_access_token'),
        },
        config
      )
      .then((res) => {
        // console.log(res);
        loadTodoList();
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const updateTodoHandler = (e) => {
    axios
      .put(
        URL(e.target.parentElement.id),
        {
          id: e.target.parentElement.id,
          todo: inputTodoValue.current.value,
          isCompleted:
            e.target.parentElement.className === 'done' ? true : false,
          userId: localStorage.getItem('jwt_access_token'),
        },
        config
      )
      .then((res) => {
        // console.log(res);
        loadTodoList();
        inputTodoValue.current.value = '';
      })
      .catch((err) => {
        // console.log(err.request);
        // console.log(err.response);
      });
  };

  const enterKeyHandler = (e) => {
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      inputTodoHandler(e.target.value);
      e.target.value = '';
    } else return 0;
  };

  const updateCancelHandler = (e) => {
    e.target.parentElement.style.display = 'none';
    e.target.parentElement.childNodes[0].value = '';
  };

  const todoUpdateHandler = (e) => {
    axios
      .put(
        URL(e.target.parentElement.parentElement.id),
        {
          id: e.target.parentElement.parentElement.id,
          todo: e.target.parentElement.childNodes[0].value,
          isCompleted:
            e.target.parentElement.parentElement.className === 'done'
              ? true
              : false,
          userId: localStorage.getItem('jwt_access_token'),
        },
        config
      )
      .then((res) => {
        // console.log(res);
        loadTodoList();
        e.target.parentElement.style.display = 'none';
        e.target.parentElement.childNodes[0].value = '';
      })
      .catch((err) => {
        // console.log(err.request);
        // console.log(err.response);
      });
  };

  useEffect(() => {
    document.title = '프리온보딩 커리어 챌린지 2022 | todo 목록';
    loadTodoList();
  }, []);

  return (
    <div className="todo__app__wrap">
      <main className="todo__app">
        <section className="logout__container">
          <button
            onClick={() => {
              window.localStorage.clear();
              window.location.reload();
            }}
          >
            👋
          </button>
        </section>

        <section className="input__todo__container">
          <input
            ref={inputTodoValue}
            // placeholder="todo 입력 / 수정"
            placeholder="todo 추가"
            onKeyDownCapture={(e) => {
              enterKeyHandler(e);
            }}
          />

          <button
            onClick={() => {
              inputTodoHandler(inputTodoValue.current.value);
              inputTodoValue.current.value = '';
            }}
          >
            📝
          </button>
        </section>

        <section className="todo__lists">
          {renderTodoItems.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className={item.isCompleted === true ? 'done' : 'liveAlive'}
            >
              <span
                style={{
                  textDecorationLine:
                    item.isCompleted === true ? 'line-through' : 'none',
                }}
                onClick={(e) => {
                  todoIsComplitedToggle(e);
                }}
              >
                {item.todo}
              </span>

              <span>{item.isCompleted ? '<✔️>' : '<💬>'}</span>

              {/* <button onClick={(e) => updateTodoHandler(e)}>수정</button> */}
              <button
                onClick={(e) =>
                  (e.target.parentElement.childNodes[4].style.display = 'block')
                }
              >
                ✏️
              </button>
              <button onClick={(e) => deleteTodoHandler(e)}>🧼</button>

              <article style={{ display: 'none' }}>
                <input placeholder="수정할 내용" />
                <button onClick={(e) => todoUpdateHandler(e)}>💾</button>
                <button
                  onClick={(e) => {
                    updateCancelHandler(e);
                  }}
                >
                  🗙
                </button>
              </article>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
