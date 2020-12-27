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
2) Simple server find. Implementation of a scheduler that updates/inserts once a week(AM 2:00 in South Korea Time) on the DB. (간단한 서버 찾기. 백엔드에서 일주일에 새벽 2시 한번 API 데이터를 DB에 삽입/갱신하는 스케쥴러 구현. nosql?)
3) Check weekly resets and add information. (주간리셋사항 확인하고 정보 추가하기. i.e. NPC's exchange item)
4) User Login (OAuth2). (유저 로그인 기능 일단 스팀 계정 먼저.)
5) Implementation of the function to receive quests on the web. (퀘스트를 웹으로 받는 기능 구현. 현재 데스티니 가디언즈 컴패니언 앱에서는 기능이 구현되어있음. 궤도에 있을 때만 가능한 제약 조건 존재. 이 부분은 조금더 조사가 필요.)
6) Implemented manual operation of weekly resets on the admin page. (관리자페이지에 주간리셋사항 수동 저장기능 구현. i.e. Xur's item)
7) Youtube video or image link on the main screen. (메인 화면에 유튜브 영상 또는 이미지 링크.)
8) Destiny2's unique loading mask implemented as svg or canvas. (데스티니2 특유의 로딩마스크를 svg나 canvas로 구현.)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
