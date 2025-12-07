# Exocortex Appkit

**Exocortex Appkit**은 Exocortex 생태계에서 사용되는 공통 UI 컴포넌트와 유틸리티를 관리하는 Monorepo입니다.
[npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)와 [Changesets](https://github.com/changesets/changesets)를 기반으로 운영되며, 모든 패키지는 **TypeScript 소스 코드 형태**로 [GitHub Packages](https://github.com/features/packages)에 배포됩니다.

## 📦 Packages

모든 패키지는 `@iamssen` 스코프 하에 배포됩니다.

| Package                             | Description                                 |
| ----------------------------------- | ------------------------------------------- |
| `@iamssen/country-code`             | ISO 국가 코드 및 국기 데이터 유틸리티       |
| `@iamssen/dialog`                   | Promise 기반의 React Dialog 시스템          |
| `@iamssen/format`                   | 숫자, 통화 등 데이터 포맷팅 라이브러리      |
| `@iamssen/use-element-intersection` | Intersection Observer 기반의 요소 감지 Hook |
| `@iamssen/use-local-storage`        | Type-safe한 LocalStorage 상태 관리 Hook     |

## 🚀 Installation & Setup

이 라이브러리는 GitHub Packages 레지스트리를 통해 배포됩니다. 패키지를 설치하려면 프로젝트 루트의 `.npmrc` 파일에 레지스트리 설정이 필요합니다.

```ini
@iamssen:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

> [!IMPORTANT]
> **TypeScript Source Export Notes**
>
> 이 패키지들은 빌드된 JavaScript 번들이 아닌 **TypeScript 소스 파일(.ts/.tsx)을 그대로 export** 합니다.
> 별도의 타입 정의 파일(.d.ts)이 제공되지 않으며, 소스 코드를 직접 참조하는 방식입니다.
>
> **Frontend (Vite, Next.js 등)**
>
> - 최신 프론트엔드 빌드 도구는 TypeScript를 기본 지원하므로 별도 설정 없이 바로 사용할 수 있습니다.
>
> **Backend / Script (Node.js)**
>
> - Node.js 22.6.0 이상에서 `--experimental-strip-types` 플래그를 사용하여 실행하는 환경이 테스트되었습니다.
> - 그 외의 환경(`ts-node`, `tsx` 등)에서는 별도의 설정이 필요할 수 있으며, 공식적으로 테스트되지 않았습니다.

## 🛠️ Local Development

### Project Setup

저장소를 클론하고 의존성을 설치합니다. `husky`를 통해 Git Hook이 자동으로 설정됩니다.

```bash
npm install
```

### Key Commands

주요 개발 명령어입니다.

| Command              | Description                                      |
| -------------------- | ------------------------------------------------ |
| `npm run type-check` | TypeScript 타입 오류를 실시간으로 감시합니다.    |
| `npm test`           | Vitest를 사용하여 유닛 테스트를 수행합니다.      |
| `npm run lint`       | ESLint로 코드 스타일과 잠재적 오류를 검사합니다. |
| `npm run format`     | Prettier로 코드를 포맷팅합니다.                  |

## 📦 Release Workflow

배포 프로세스는 **Changesets**와 **GitHub Actions**를 통해 완전히 자동화되어 있습니다.

1. **Changeset 생성**: 기능 개발 후 PR을 생성하기 전, 변경 사항에 대한 Changeset을 생성합니다.
   ```bash
   npx changeset
   ```
2. **Pull Request 병합**: `main` 브랜치에 코드가 병합되면 CI가 트리거됩니다.
3. **Version Bump**: `Changeset Action`이 자동으로 버전을 올리는 PR("Version Packages")을 생성합니다.
4. **배포 (Publish)**: 해당 PR이 병합되면, GitHub Packages에 새로운 버전이 자동으로 배포됩니다.
