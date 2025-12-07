# Exocortex Appkit

이 저장소는 [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces), [Changesets](https://github.com/changesets/changesets)를 사용하여 관리되며 [GitHub Packages](https://github.com/features/packages)로 배포되는 Monorepo입니다.

## Packages

모든 패키지는 `@iamssen` scope로 배포됩니다.

- `@iamssen/country-code`
- `@iamssen/dialog`
- `@iamssen/format`
- `@iamssen/use-element-intersection`
- `@iamssen/use-local-storage`

## 설치 및 사용 (Installation & Usage)

이 패키지들을 사용하려면 프로젝트 루트의 `.npmrc` 파일에 다음 설정이 필요합니다:

```ini
@iamssen:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

## 로컬 개발 가이드 (Local Development)

이 섹션은 개발자가 로컬 환경에서 수행해야 하는 작업들입니다.

### 1. 시작하기 (Getting Started)

저장소를 클론하고 의존성을 설치합니다. `husky`를 통해 git hook이 자동으로 설정됩니다.

```bash
npm install
```

### 2. 개발 및 테스트 (Development & Testing)

- **타입 체크 (Watch Mode)**: 실시간으로 타입 오류를 확인합니다.
  ```bash
  npm run type-check
  ```
- **테스트 실행**: 유닛 테스트를 실행합니다.
  ```bash
  npm test
  ```

### 3. 코드 품질 관리 (Code Quality)

코드를 커밋하기 전에 스타일과 오류를 검사할 수 있습니다. (Commit 시 자동으로 실행됩니다)

- **린트 (Lint)**:
  ```bash
  npm run lint
  ```
- **포맷팅 (Format)**:
  ```bash
  npm run format
  ```

### 4. 배포 준비 (Release Preparation)

새로운 기능을 추가하거나 수정하여 배포가 필요할 때, **반드시 Changeset을 생성해야 합니다.**

```bash
npx changeset
```

대화형 프롬프트를 따라 변경된 패키지와 변경 유형(major, minor, patch)을 선택하세요. 이 명령어로 생성된 changeset 파일만 커밋하여 푸시하면 이후 과정은 자동화됩니다.

---

## CI/CD 자동화 (Automation)

이 섹션은 Github Actions를 통해 자동으로 수행되는 작업들입니다. 개발자가 직접 실행할 필요는 없지만, 프로세스를 이해하는 데 도움이 됩니다.

### 자동화된 배포 프로세스

1. **Pull Request Merged (to `main`)**:
   - `main` 브랜치에 코드가 병합되면 CI가 트리거됩니다.
   - **Changeset이 있는 경우**: `Changeset Action`이 버전 범프(bump) PR을 자동으로 생성합니다.
2. **Version Bump PR Merged**:
   - 버전 범프 PR이 병합되면, CI가 다시 트리거됩니다.
   - `npm run publish-packages`가 실행되어 GitHub Packages에 패키지가 자동으로 배포됩니다.

### 수동 실행이 필요한 경우 (Manual Steps)

로컬에서 수동으로 버전을 올리거나 배포를 테스트해야 하는 경우에만 사용합니다.

- **버전 적용**: `npm run version-packages`
- **배포 실행**: `npm run publish-packages`
