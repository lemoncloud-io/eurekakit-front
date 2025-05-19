<div align="center">
  <div>
    <img src="https://github.com/user-attachments/assets/3575c0a1-8087-45cc-b9f0-690765df166e" width="600" alt="EurekaKit Architecture.png"/>
    <h1 align="center"><img src="https://github.com/user-attachments/assets/aee10faf-144c-4a88-b535-610e7c84f050" width="200" alt="EurekaKit"/></h1>
  </div>
  <p>
    Build SNS services quickly and easily with EurekaKit.
  </p>
</div>

<div align="center" markdown="1">

[![lemoncloud-io](https://img.shields.io/badge/by-lemoncloud--io-ED6F31?logo=github)](https://github.com/lemoncloud-io)
[![Nx](https://img.shields.io/badge/-Nx-143157?logo=nx&logoWidth=30)](https://nx.dev)

<a href="README.md">English</a> | <a href="docs/readme-kr.md">한국어</a>

</div>

# 🌟 Getting Started with EurekaKit

1. Visit [EurekaCodes](https://eureka.codes/) to subscribe to the service
2. Create a workspace in the Eureka Code dashboard
3. Start development

## Features

**🧱All-In-One SNS Feed System**

- Post and Comment System: Support for various content formats including text, images, and videos
- Interaction Features: Various interaction options such as likes, shares, bookmarks, and reports for user engagement
- Customized Feed Algorithm: Personalized feeds based on user interests and activities

**🔄 Infinite Scroll UI**

- Optimized Loading System: Provides a UX that naturally loads content as you scroll
- Performance Optimization: Optimized rendering system that smoothly processes large amounts of data
- Skeleton Loading: Skeleton UI that enhances user experience during content loading

**📂 Activity History Collection**

- Activity History: Record of all activities including feeds created, comments left, posts liked, etc.
- Viewing History: Feature to easily find recently viewed content
- Customized Summary: Provides statistics and summary information about your activities

**🛠 Admin + App(WebView) Kit**

- Admin Dashboard: Complete administrative tools for user management, content moderation, service analysis, etc.
- React Native WebView App: Solution to quickly convert web services to mobile apps
- Cross-Platform Support: Consistent user experience across web, iOS, and Android

## Tech Stack

- Frontend Framework: React with TypeScript
- Project Structure: Nx Monorepo
- State Management: TanStack Query
- Styling: Tailwind CSS
- UI Components: Shadcn(Radix UI)
- API Integration: Axios

## Project Structure

```
eureka-kit
├── apps/
│   └── admin/            # Admin main entry point
│   └── mobile/           # React Native WebView main entry point
│   └── web/              # Service main entry point
├── assets/               # Project shared assets
├── libs/
│   ├── web-core/         # API authentication and initialization core library
│   ├── comments/         # Comments related API library
│   ├── feeds/            # Feeds related API library
│   ├── users/            # Users related API library
│   ├── uploads/          # Image upload related API library
│   ├── app-checker/      # React Native WebView communication library
│   ├── ui-kit/           # Common UI kit library
│   ├── shared/           # Common utility library
│   ├── types/            # Common type library
│   ├── overlay/          # Overlay management library
│   └── theme/            # Theme management library
├── scripts/              # Development scripts
├── nx.json               # nx configuration file
└── package.json          # Workspace package manager configuration file
```

## Getting Started

### Development Environment

- Node.js (v20 or higher)
- npm or yarn
- Git
- Android Studio or Xcode (for mobile app development)

### Installation

1. Clone the project

```bash
git clone https://github.com/lemoncloud-io/eurekakit-front.git
cd eurekakit-front
```

2. Install dependencies

```bash
yarn install
```

3. Environment variable setup

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/admin/.env.example apps/admin/.env.local

# Environment-specific setup (development, production, etc.)
# cp apps/web/.env.example apps/web/.env.(local|dev|prod|dev.local|...)
```

> - Q: Where are environment variables and required backend APIs provided?
> - A: Backend APIs can be obtained through the EurekaCodes platform. After subscribing and creating a workspace, you will receive dedicated API endpoints.

4. Run development server

```bash
# Run web service development server
yarn web:start

# Run mobile app development server (requires web server running first / simulator needed)
yarn mobile:start

# Run admin development server
yarn admin:start
```

> - Web service is accessible at http://localhost:5003
> - Admin service is accessible at http://localhost:5004
> - Mobile app runs on Android or iOS simulator and requires the web service to be running first.

## Contributing

We welcome contributions to EurekaKit! Please read our [contribution guidelines](CONTRIBUTING.md) for details on how to submit pull requests, the development process, and coding standards.

## License

EurekaKit is licensed under a proprietary license that restricts commercial usage to active EurekaCodes subscribers only. Public access to this repository is provided for evaluation purposes only.

For detailed license terms, please see the [LICENSE](LICENSE.md) file.

## Contributors ✨

Thanks goes to these wonderful people:

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

If this project has been helpful, please consider giving it a Star ⭐️!

Maintainer

- [@Luke](https://github.com/luke-lemon/)
- [@Louis](https://github.com/louis-lemon)
