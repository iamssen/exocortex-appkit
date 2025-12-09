# Code Review: exocortex-appkit

## 개요

이 문서는 `exocortex-appkit`의 코드 리뷰 결과입니다.

## Review Summary

전반적으로 코드는 간결하고 목적이 명확합니다. TypeScript 소스 코드를 그대로 배포하는 방식이므로, 소비하는 측(App)에서 번들링 최적화가 가능합니다. 몇 가지 개선 가능한 API 일관성 문제와 Side-effect가 발견되었습니다.

## Packages Review

### `@iamssen/country-code`

- **구조**: 매우 단순하고 명확합니다.
- **API**: `getFlag` 함수와 `Flag` 컴포넌트를 제공합니다. 문자열 조작을 통한 Emoji 변환 로직이 깔끔하게 격리되어 있습니다.
- **개선점**: 없음.

### `@iamssen/dialog`

- **구조**: `useDialog` 훅을 통해 Promise 기반의 다이얼로그 호출을 지원합니다.
- **API**: `openDialog` 호출 시 Promise를 반환하고, 다이얼로그가 닫힐 때 resolve되는 방식은 비동기 흐름 제어에 매우 유리합니다.
- **개선점**:
  - **Global Event Listener Stacking**: `useESC` 훅이 `globalThis`에 `keydown` 이벤트를 등록합니다. 여러 다이얼로그가 중첩되어 열려있을 때, ESC를 누르면 모든 다이얼로그가 동시에 닫히는 동작을 할 가능성이 있습니다. Stack 구조나 `preventDefault` / `stopPropagation` 처리가 고려되어야 합니다.

### `@iamssen/format`

- **구조**: `numeral` 라이브러리를 래핑하여 포맷팅을 제공합니다.
- **API**: `Format` 컴포넌트와 `format` 함수를 제공하며, Context를 통해 설정을 공유합니다.
- **아쉬운 점**:
  - **Side Effect**: `format.ts` 파일 최상단에서 `numeral.options.scalePercentBy100 = false;`를 실행합니다. 이 모듈을 import하는 것만으로 전역 `numeral` 설정이 변경되므로, 앱 내의 다른 곳에서 `numeral`을 사용할 때 의도치 않은 동작을 유발할 수 있습니다.
  - **Hardcoded Styles**: `components.tsx`의 `Format` 컴포넌트 내부에서 `fontSize: '0.9em'` 등의 인라인 스타일이 하드코딩 되어 있습니다. 스타일 오버라이딩을 어렵게 만들 수 있습니다.

### `@iamssen/use-element-intersection`

- **구조**: `IntersectionObserver`의 React Wrapper입니다.
- **API**: `observeOnce` 옵션 등 실무에서 자주 쓰이는 패턴이 잘 구현되어 있습니다.

### `@iamssen/use-local-storage`

- **구조**: `localStorage`를 연동하는 Hook입니다.
- **API**: `useLocalStorage` (string)와 `useLocalStorageJson` (object)으로 나뉩니다.
- **개선점**:
  - **API Inconsistency**: `useLocalStorage`는 `setValue((prev) => ...)` 형태의 Functional Update를 지원하지만, `useLocalStorageJson`은 지원하지 않습니다 (`setValue(nextValue)`만 가능). API 일관성을 위해 JSON 버전도 Functional Update를 지원하는 것이 좋습니다.

## Package Structure

```
packages
├── country-code
│   ├── Flag.tsx
│   └── getFlag.ts
├── dialog
│   ├── useDialog.ts
│   └── useESC.ts
├── format
│   ├── components.tsx
│   ├── context.ts
│   ├── env.ts
│   ├── evaluate.tsx
│   └── format.ts
├── use-element-intersection
│   └── index.ts
└── use-local-storage
    └── index.ts
```
