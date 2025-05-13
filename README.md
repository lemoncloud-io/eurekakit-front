<div align="center">
  <div>
    <img src="" width="600" alt="EurekaKit Architecture.png"/>
    <h1 align="center"><img src="" width="200" alt="EurekaKit"/></h1>
  </div>
  <p>
    유레카 키트 설명
  </p>
</div>

<div align="center" markdown="1">

[![lemoncloud-io](https://img.shields.io/badge/by-lemoncloud--io-ED6F31?logo=github)](https://github.com/lemoncloud-io)
[![license](https://img.shields.io/badge/license-MIT-211A4C.svg?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0ibTMgNiAzIDFtMCAwLTMgOWE1IDUgMCAwIDAgNi4wMDEgME02IDdsMyA5TTYgN2w2LTJtNiAyIDMtMW0tMyAxLTMgOWE1IDUgMCAwIDAgNi4wMDEgME0xOCA3bDMgOW0tMy05LTYtMm0wLTJ2Mm0wIDE2VjVtMCAxNkg5bTMgMGgzIi8+PC9zdmc+)](https://github.com/lemoncloud-io/eurekabox-front/blob/main/LICENSE)
[![Nx](https://img.shields.io/badge/-Nx-143157?logo=nx&logoWidth=30)](https://nx.dev)

</div>

# 🌟 EurekaKit로 시작하기

1. [EurekaCodes](https://eureka.codes/)를 방문하여 서비스를 구독하기
2. Create your workspace through the EurekaCodes dashboard
3. Start creating your team documentation

## 기능

- ???

## 기술 스택

- Frontend Framework: React with TypeScript
- Project Structure: Nx Monorepo
- State Management: TanStack Query
- Styling: Tailwind CSS
- UI Components: shadcn(Radix UI)
- API Integration: Axios

## 프로젝트 구조

```
eureka-kit
├── apps/
│   └── admin/            # 어드민 메인 엔트리 포인트
│   └── mobile/           # 리액트 네이비트 웹뷰 메인 엔트리 포인트
│   └── web/              # 서비스 메인 엔트리 포인트
├── assets/               # 프로젝트 공유 에셋
├── libs/
│   ├── web-core/         # API 인증 및 초기화 코어 라이브러리
│   ├── comments/         # 답글(comments) 관련 API 라이브러리
│   ├── feeds/            # 게시글(feeds) 관련 API 라이브러리
│   ├── users/            # 유저(users) 관련 API 라이브러리
│   ├── uploads/          # 이미지 업로드 관련 API 라이브러리
│   ├── app-checker/      # 리액트 네이티브 웹뷰 통신 관련 라이브러리
│   ├── ui-kit/           # 공용 UI 키트 라이브러리
│   ├── shared/           # 공용 유틸리티 라이브러리
│   ├── types/            # 공용 타입 라이브러리 ?? -> shared의 타입이랑 무슨 차이지?
│   ├── overlay/          # 오버레이 관리 라이브러리
│   └── theme/            # 테마 관리 라이브러리
├── scripts/              # 개발 스크립트
├── nx.json               # nx 환경 설정 파일
└── package.json          # 워크스페이스 패키지 매니저 환경설정 파일
```

## 시작하기

### 개발 환경

- Node.js (v20 혹은 그 이상)
- npm or yarn
- Git

### 설치 방법

1. 프로젝트 클론

```bash
git clone https://github.com/lemoncloud-io/eurekapage-front.git
cd eurekapage-front
```

2. 의존성 설치

```bash
yarn install
```

3. 환경변수(env) 설정

```bash
cp apps/web/.env.example apps/web/.env.local
# cp apps/web/.env.example apps/web/.env.(local|dev|prod|dev.local|...)
```

4. 개발 서버 시행

```bash
yarn web:start     # 서비스 개발 서버 시작
yarn mobile:start  # 모바일 개발 서버 실행(* web 서버 실행 필요 / 시뮬레이터 필요)

yarn admin:start   # 어드민 개발 서버 시작
```

서비스 개발 서버는 http://localhost:5003 에서 어드민 개발 서버는 http://localhost:5004 에서 실행됩니다.
모바일 환경은 웹뷰 기반으로 Android 혹은 iOS 시뮬레이터가 설치되어 있어야하며,
서비스 개발 서버를 먼저 실행 후 실행해야 합니다.
