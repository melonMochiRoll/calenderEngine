
# 일정 관리 시스템 -수정중
## [사이트 주소](/)
&nbsp;

## 사용 된 기술
- Front : React, React-Query, Typescript
- Back : NestJS, TypeORM
- DB : Mysql
- 배포 : AWS
&nbsp;

## 개요
- 비 로그인 시 로컬 환경에 저장
- 날짜 별 Todo 작성
- 완료/진행중 상태에 따른 정렬
- 월 별 Todo 확인
- Todo 날짜 검색

## 특징

### Front-end

### Back-end
- 로그인
  - 쿠키/세션을 통한 로그인
  - 세션엔 유저를 식별할수있는 고유한 값의 userId만을 저장
  - 이후 사용자 인증 확인시 사용자 데이터 캐싱 여부 확인 후 캐싱 데이터 or DB의 사용자 데이터를 조회

- 로그아웃
  - 로그아웃시 자원 절약을 위해 사용자 캐싱 데이터 클리어

- 유효성 검증
  - Service단의 비즈니스 로직과 결합되어있던 Validation을 분리해 Controller로 데이터를 받아오기전 Pipe단에서 Validation을 처리
  - Service는 로직에 보다 더 집중하도록 구조를 명확히해 가독성을 높이고 결합도를 낮춤

## API, 테이블 명세 등...