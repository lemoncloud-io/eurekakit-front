# Contributing to EurekaKit

Thank you for your interest in contributing to EurekaKit! This document provides guidelines and instructions for contributing to this project.

## Important License Notice

**Please note:** EurekaKit is available as a public repository but is licensed under a proprietary license that restricts commercial usage to active EurekaCodes subscribers only. Contributions you make will be subject to the same license terms.

## Ways to Contribute

Even with the licensing restrictions, there are several ways you can contribute to EurekaKit:

1. **Reporting Bugs**: Create an issue describing the bug, including steps to reproduce
2. **Suggesting Enhancements**: Propose new features or improvements
3. **Code Contributions**: Submit pull requests for bug fixes or feature enhancements
4. **Documentation**: Help improve or translate documentation

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/lemoncloud-io/eurekakit-front.git`
3. Install dependencies: `yarn install`
4. Set up environment variables as described in the README.md
5. Make your changes on a new branch

## Pull Request Process

1. Create a branch with a descriptive name:

```shell
git checkout -b feature/your-feature-name
```

2. Make your changes and commit them with clear, descriptive messages following our commit message conventions

3. Push your branch and create a pull request to the `main` branch

4. Wait for a maintainer to review your PR

## Coding Standards

### General Guidelines

- Use TypeScript for all code
- Follow the existing code style
- Add JSDoc comments for all public functions and components
- Write unit tests for new functionality

### React Best Practices

- Use functional components with hooks
- Keep components small and focused on a single responsibility
- Use the provided UI components from our UI kit

### Nx Conventions

- Follow the Nx monorepo architecture
- Respect library boundaries and dependencies
- Use Nx commands for generating new components/modules

## Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>
[optional body]
[optional footer(s)]
```

Types include:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Example:

```
feat(feeds): add support for video content in feeds

Adds video player component
Updates feed card to handle video content
Adds video upload functionality

Resolves: #123
```

## Code Review Process

All submissions require review by at least one of the core team members before being merged. We use GitHub's review system for this purpose.

## Community and Conduct

Please maintain a respectful and inclusive environment. We expect all contributors to:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Questions?

If you have any questions about contributing, please contact us through:

- [GitHub Issues](https://github.com/lemoncloud-io/eurekakit-front/issues)
- Email: developer@lemoncloud.io
