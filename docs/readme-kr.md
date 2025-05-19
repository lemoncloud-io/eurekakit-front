<div align="center">
  <div>
    <img src="https://github.com/user-attachments/assets/3575c0a1-8087-45cc-b9f0-690765df166e" width="600" alt="EurekaKit Architecture.png"/>
    <h1 align="center"><img src="https://github.com/user-attachments/assets/aee10faf-144c-4a88-b535-610e7c84f050" width="200" alt="EurekaKit"/></h1>
  </div>
  <p>
    유레카 키트로 SNS 서비스를 쉽고 빠르게 구축하세요.
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

**🧱All-In-One SNS 피드 구성**

- 게시글 및 댓글 시스템: 텍스트, 이미지, 동영상을 포함한 다양한 형식의 콘텐츠 게시 지원
- 인터랙션 기능: 좋아요, 공유, 북마크, 신고 등 사용자 참여를 위한 다양한 상호작용 옵션
- 맞춤형 피드 알고리즘: 사용자 관심사와 활동 기반의 개인화된 피드 제공

**🔄 무한 스크롤 UI 제공**

- 최적화된 로딩 시스템: 스크롤에 따라 자연스럽게 콘텐츠를 로드하는 UX 제공
- 성능 최적화: 대량의 데이터도 부드럽게 처리하는 최적화된 렌더링 시스템
- 스켈레톤 로딩: 콘텐츠 로딩 중 사용자 경험을 향상시키는 스켈레톤 UI

**📂 내 활동 모아보기**

- 활동 히스토리: 내가 작성한 피드, 남긴 댓글, 좋아요한 글 등 모든 활동 기록
- 열람 기록: 최근에 확인한 콘텐츠를 쉽게 다시 찾을 수 있는 기능
- 맞춤형 요약: 내 활동에 대한 통계 및 요약 정보 제공

**🛠 어드민 + 앱(WebView) 키트 제공**

- 관리자 대시보드: 사용자 관리, 콘텐츠 모더레이션, 서비스 분석 등을 위한 완전한 관리자 도구
- React Native 웹뷰 앱: 웹 서비스를 빠르게 모바일 앱으로 변환할 수 있는 솔루션
- 크로스 플랫폼 지원: 웹, iOS, Android 모두에서 일관된 사용자 경험 제공

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
│   ├── types/            # 공용 타입 라이브러리
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
- Android Studio 또는 Xcode (모바일 앱 개발 시)

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
cp apps/admin/.env.example apps/admin/.env.local

# 환경별 설정 (개발, 프로덕션 등)
# cp apps/web/.env.example apps/web/.env.(local|dev|prod|dev.local|...)
```

> - Q: 환경변수 및 필요한 백엔드 API는 어디서 제공되나요?
> - A: [EurekaCodes](https://eureka.codes/) 플랫폼을 통해 백엔드 API를 제공받을 수 있습니다. 구독 후 워크스페이스를 생성하면 전용 API 엔드포인트를 얻을 수 있습니다.

4. 개발 서버 시행

```bash
# 웹 서비스 개발 서버 실행
yarn web:start

# 모바일 앱 개발 서버 실행 (웹 서버 선행 실행 필요 / 시뮬레이터 필요)
yarn mobile:start

# 어드민 개발 서버 실행
yarn admin:start
```

> - 웹 서비스는 http://localhost:5003 에서 접속 가능합니다.
> - 어드민 서비스는 http://localhost:5004 에서 접속 가능합니다.
> - 모바일 앱은 Android 또는 iOS 시뮬레이터에서 실행되며, 웹 서비스가 먼저 실행되어야 합니다.

## 기여하기

유레카 키트에 기여해 주셔서 감사합니다! 풀 리퀘스트 제출 방법, 개발 프로세스, 코딩 표준에 대한 자세한 내용은 [가이드라인](../CONTRIBUTING.md)을 참조하세요.

## 라이센스

유레카 키트는 상업적 사용을 유레카코즈 구독자로 제한하는 독점 라이센스로 제공됩니다. 이 레포지토리에 대한 공개 접근은 평가 목적으로만 제공됩니다.

자세한 라이센스 조건은 [LICENSE](../LICENSE.md) 파일을 참조하세요.

## 기여자 ✨

이 멋진 분들께 감사드립니다:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/luke-lemon"><img src="https://avatars.githubusercontent.com/luke-lemon" width="100px;" alt=""/><br /><sub><b>@Luke</b></sub></a><br /><a href="https://github.com/lemoncloud-io/eurekakit-front/commits?author=luke-lemon" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/louis-lemon"><img src="https://avatars.githubusercontent.com/louis-lemon" width="100px;" alt=""/><br /><sub><b>@Louis</b></sub></a><br /><a href="https://github.com/lemoncloud-io/eurekakit-front/commits?author=louis-lemon" title="Code">💻</a></td>
  </tr>
</table>
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

이 프로젝트가 도움이 되셨다면, 별표(⭐️)를 고려해 주세요!

메인테이너

- [@Luke](https://github.com/luke-lemon/)
- [@Louis](https://github.com/louis-lemon)
