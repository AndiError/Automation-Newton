# Newton (Stage) E2E tests (Playwright)

Target app: [Newton Stage Login](https://stage.newtonresearch.ai/login?returnTo=%2F)

## What you get
- Playwright + TypeScript setup
- First test: **Login**
- GitHub Actions workflow that runs on PRs/push to `main`

## 1) Prerequisites (local)
- Node.js 20+

## 2) Install
```bash
npm ci
npx playwright install --with-deps chromium
```

## 3) Configure env (local)
This repo reads credentials from environment variables.

1. Copy the template:
```bash
cp env.example .env
```
2. Edit `.env` and fill:
- `BASE_URL` (default is stage)
- `E2E_EMAIL`
- `E2E_PASSWORD`

## 4) Run tests (local)
```bash
npm test
```

Useful options:
```bash
npm run test:ui
npm run test:headed
npm run test:debug
```

## 5) Setup GitHub Actions (CI)
In your GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**

Add:
- `BASE_URL` = `https://stage.newtonresearch.ai`
- `E2E_EMAIL` = your stage test user email
- `E2E_PASSWORD` = your stage test user password

Then every PR / push to `main` will run `npm test` and upload the HTML report artifact.

## Notes (important)
- The selectors in `tests/pages/LoginPage.ts` are **generic** (`getByLabel`, `getByPlaceholder`, button by role). If Newton UI uses custom inputs without labels, you may need to adjust selectors.
- Keep credentials in **GitHub Secrets** only (never commit `.env`).

# Automation-Newton
