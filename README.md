# Anime Reminder
## 개요
- 애니메이션 정보를 실시간으로 받을 수 있도록 도와주는 PWA앱
- 오프라인 지원, 푸쉬 알림 지원 (Android, Web)

## 실행 방법
```sh
$ yarn
$ yarn build
$ yarn prod-run
```
[http://localhost:3000](http://localhost:3000) 접속하여 확인

## API정보
- 문서 : https://ohli.moe/api
- 실제 사용 API : https://api.miel.dev/ ```(cors 문제를 해결하기 위해 프록시 사용)```
  - 예시 : https://api.miel.dev/timetable/list/now
  