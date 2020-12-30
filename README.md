# d2info

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### What I want to do (구현하고 싶은 목록)

1) Vuex modulariztion of required manifests after bungie.net API analysis. (번지넷 API 분석 후 필요한 manifest를 vuex 모듈화)
  - vuex module, vuex-persistedstate 라이브러리 사용 (완료, 추후 모듈이 더 추가될 예정)
  - 현재 manifest 정보를 localStorage에 넣어서 보관하는데, expire에 대한 고민
  - App.vue에 manifest version 체크하는 로직이 있는데, 이 부분을 어떻게 처리할 지 고민...
  
2) Simple server find. Implementation of a scheduler that updates/inserts once a week(AM 2:00 in South Korea Time) on the DB. (간단한 서버 찾기. 백엔드에서 일주일에 새벽 2시 한번 API 데이터를 DB에 삽입/갱신하는 스케쥴러 구현. nosql?)
  - 고민 중
  
3) Check weekly resets milestone and add information. (주간리셋사항 확인하고 정보 추가하기. i.e. NPC's exchange item)
  - 주간 리셋사항 - 황혼전, 공격전, 시련의 장 (완료)
  - 딥스톤무덤 챌린지 (예정)
  - 주간리셋 페이지 레이아웃 (예정)
  - 지도 상에 떠있는 던전 정보 확인 (확인 필요)
  - 재료 교환 (예정. 로그인 토큰 필요.)
  - 퀘스트 확인 (확인 필요)
  
4) User Login (OAuth2). (유저 로그인 기능. 5개 로긴 방식 모두 가능. 일단 steam 먼저.)
  - 로그인 auth, token 로직 구현 (완료)
  - refresh token 방식 구현 (예정)
  - 로그인했을 때만 접속할 수 있는 페이지 및 beforeEnter auth 로직 구현 (예정)

5) Implementation of the function to receive quests on the web. (퀘스트를 웹으로 받는 기능 구현. 현재 데스티니 가디언즈 컴패니언 앱에서는 기능이 구현되어있음. 궤도에 있을 때만 가능한 제약 조건 존재. 이 부분은 조금더 조사가 필요.)
  - 조사가 필요

6) Implemented manual operation of weekly resets on the admin page. (관리자페이지에 주간리셋사항 수동 저장기능 구현. i.e. Xur's item)
  - 마지막 소원, 구원의 정원 챌린지 (예정. 주기적인 로테이션으로 돌리도록 함.)
  - 암상인 (무기, 방어구 및 스텟의 경우 수동으로 입력할 듯. 각 지역 지도이미지로 표현 예정)

7) Youtube video or image link on the main screen. (메인 화면에 유튜브 영상 또는 이미지 링크)
  - 추후 전체적인 레이아웃 진행 (고민 중)

8) Destiny2's unique loading mask implemented as svg or canvas. (데스티니2 특유의 로딩마스크를 svg나 canvas로 구현.)
  - 고민 중

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
