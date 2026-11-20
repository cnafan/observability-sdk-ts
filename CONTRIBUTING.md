# Contributing to observability-sdk-ts

## Prerequisites

- Node.js 22.15 or later
- Git

Install dependencies with `npm install` and build with `npm run build`.

## API and signal-definition changes

- Keep the package entry point in `src/index.ts` as the supported public API surface.
- Keep the A2A, workflow, and agent YAML files aligned with the Java and Python SDKs.
- When a signal definition changes, increment its YAML version and update the English and Chinese API references and development guides.
- Treat removal or tightening of a published signal, attribute, type, requiredness, or metric dimension as a breaking change.
- Keep implementation helpers private unless they are intentionally added to the public API.

## Commits and pull requests

- Use Conventional Commit messages, for example `feat(sdk): add exporter option` or `fix(validation): reject invalid metric dimension`.
- Sign every commit off with DCO: `git commit -s -m "..."`.
- Write pull request titles and descriptions in English.
- Do not push commits directly to the upstream repository; submit pull requests from a personal fork.
