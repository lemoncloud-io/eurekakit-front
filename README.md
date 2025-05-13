<div align="center">
  <div>
    <img src="https://github.com/user-attachments/assets/3575c0a1-8087-45cc-b9f0-690765df166e" width="600" alt="EurekaKit Architecture.png"/>
    <h1 align="center"><img src="https://github.com/lemoncloud-io/eurekakit-front/blob/develop/assets/src/images/logo_eureka_codes.png?raw=true" width="200" alt="EurekaCodes"/></h1>
  </div>
  <p>
    유레카 키트 설명
  </p>
</div>

<div align="center" markdown="1">

[![lemoncloud-io](https://img.shields.io/badge/by-lemoncloud--io-ED6F31?logo=github)](https://github.com/lemoncloud-io)
[![Nx](https://img.shields.io/badge/-Nx-143157?logo=nx&logoWidth=30)](https://nx.dev)

</div>

# 🌟 EurekaKit로 시작하기

1. [EurekaCodes](https://eureka.codes/)를 방문하여 서비스를 구독하기
2. 유레카 코드 대시보드에서 워크스페이스 생성하기
3. 개발 시작하기

## 기능

- **🧱All-In-One SNS 피드 구성** - 텍스트와 이미지를 올릴 수 있는 게시글과 댓글, 그리고 좋아요, 신고 등 SNS에 필요한 피드 기능을 모두 제공합니다.
- **🔄 무한 스크롤 UI 제공** -스크롤을 내릴수록 자연스럽게 콘텐츠가 로드되는 무한 스크롤 UI를 제공합니다.
- **📂 내 활동 모아보기** - 내가 작성한 피드, 남긴 댓글, 좋아요한 글, 열람한 글을 한 곳에서 확인할 수 있어요
- **🛠 어드민 + 앱(WebView) 키트 제공** - 운영용 어드민과 React Native 기반의 앱(WebView) 키트를 함께 제공해 웹과 앱 모두 빠르게 서비스할 수 있습니다.

## 기술 스택

- Frontend Framework: React with TypeScript
- Project Structure: Nx Monorepo
- State Management: TanStack Query
- Styling: Tailwind CSS
- UI Components: Shadcn(Radix UI)
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
git clone https://github.com/lemoncloud-io/eurekakit-front.git
cd eurekakit-front
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

서비스(web) 개발 서버는 http://localhost:5003 에서 어드민 개발 서버는 http://localhost:5004 에서 실행됩니다.
모바일 환경은 웹뷰 기반으로 Android 혹은 iOS 시뮬레이터가 설치되어 있어야하며,
서비스 개발 서버를 먼저 실행 후 실행해야 합니다.
