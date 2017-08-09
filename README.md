# Team Project- Traveller

## 프로젝트 계획서

### Team members

>  Front End Developer

- `Serom`
- `Dasom`

> UX UI Design

- `Ado`

---

### 팀 프로젝트 소개

> 여행지 블로그 서비스

- 사용자가 자신이 다녀온 여행에 대한 정보를 등록하고, 다른 회원들이 여행지를 공유받을 수 있는 서비스를 제공한다.

---

### 프로젝트 목적

- 디자이너와 협업을 통한 실무경험
- 웹 접근성 준수
- 수업의 복습과 활용
- 프론트앤드로 향한 한단계 레벨업

---

### 기능 MVP(Minimal Viable Product)

- 회원가입
- 사용자 블로그 등록
- 블로그 리스트 공유

---

### 서비스 환경

- 브라우저 대응: IE 9+
- 반응형: 모바일 , 태블릿, 데스크탑
- 접근성
- Mobile First
- Back End Developer 없이 작업하기에 Firebase를 사용

---

### 사용기술

- Pug
- Sass
- Vue
- Vuex
- Webpack
- Firebase

---

### 업무 분담 및 협업 방안

- 데이터베이스 함께 설계
- 기능별 Component 작업 예정
- Git을 활용하여 장거리 협업 작업 중
- 코드 리뷰를 하여 효율적인 코드 작성

---

### Routing Table

| 1DEPTH | 2DEPTH        | PATH           |
| ------ | ------------- | -------------- |
| 메인     |               | /home          |
| 회원가입   |               | /signup        |
| 로그인    |               | /signin        |
| 회원탈퇴   |               | /memberLeave   |
| 리스트    |               | /list          |
|        | 상세            | /post          |
| 마이페이지  |               | /mypage        |
|        | 회원정보수정        | /mypage/modify |
|        | 내가 작성한 여행 리스트 | /mypage/mylist |

---