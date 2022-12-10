# wanted-pre-onboarding-frontend

## 프로젝트의 실행 방법

1. 레포지토리 클론

```bash
git clone https://github.com/rewrite0w0/wanted-pre-onboarding-frontend.git
```

2. 패키지 설치 및 실행

```npm
npm install

npm start
```

3. 조작
   [localhost:3000](http://localhost:3000)

4. 조작 설명

#### `/` 화면

- id/password를 입력합니다.
  - 입력 기준이 충족되면 로그인 버튼이 활성화됩니다.
  - 기존 계정이라면 로그인 후 `/todo`로 이동합니다.
  - 새 계정이라면 가입 후 `/todo`로 이동합니다.

#### `/todo` 화면

- todo 입력
  - `todo 추가`에 내용을 입력하고 📝 버튼 혹은 `엔터`를 입력합니다
- todo 목록
  - todo 내용 클릭시에 완료(✔️)/진행중(💬) 토글됩니다.
  - ✏️ 버튼은 수정모드입니다.
  - 🧼 버튼은 삭제입니다.
- todo 수정모드
  - `수정할 내용`에 내용을 입력합니다.
  - 🗙를 누르면 수정모드가 취소되며, 입력한 내용은 삭제됩니다.
  - 💾를 누르면 내용이 수정됩니다.
- 기타
  - 👋은 로그아웃입니다.

## 데모 영상

- https://odysee.com/wanted-pre-onboarding-frontend-demo:4

## 데모 영상은 배포 링크로 대체 가능하며, 배포 시 가산점이 부여됩니다.
