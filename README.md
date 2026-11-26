# Search UX Lab — 9가지 검색창 UI/UX 패턴 라이브러리

웹/앱 프로덕트에서 자주 쓰이는 **9가지 검색창 UX 패턴**을 실시간으로 테스트하고, **React + Tailwind** 및 **순수 HTML + CSS + JS** 코드를 원클릭으로 복사할 수 있는 인터랙티브 쇼케이스입니다.

## 포함된 9가지 검색 패턴
| 번호 | 패턴명 | 영문명 | 주요 인터랙션 |
| :--- | :--- | :--- | :--- |
| **01** | 검색창 | Search bar | 포커스 블루 링(`#3182F6`), 초기화(X), 가상 한글 키보드 |
| **02** | 자동완성 | Autocomplete | 실시간 키워드 필터링, 매칭 접두사 강조, 키보드 탐색 |
| **03** | 최근 검색어 | Recent searches | 검색어 칩 추가/개별 삭제(`×`), 전체 삭제 및 복원 |
| **04** | 인기 검색어 | Trending | 순위 번호 강조, 등락(`▲`/`▼`/`NEW`) 배지, 순위 갱신 |
| **05** | 필터 | Filter | 가격/브랜드/무료배송 칩, 양방향 가격 범위 슬라이더 |
| **06** | 정렬 | Sort | 정렬 드롭다운 메뉴 및 실시간 리스트 재정렬 |
| **07** | 검색어 강조 | Highlight | 정규표현식 기반 실시간 부분 문자열 하이라이트 |
| **08** | 결과 없음 | No results | 빈 상태 UI 및 오타 교정 링크(`혹시 OO 찾으세요?`) |
| **09** | 검색 범위 탭 | Scope tabs | `전체` · `상품` · `브랜드` · `리뷰` 탭 전환 |

---

## 로컬 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행 (Port 3008)
npm run dev:search-showcase

# 3. 프로덕션 빌드
npm run build
```

---

## Render Static Site 배포 가이드

이 저장소는 [render.yaml](./render.yaml) Blueprint 설정이 포함되어 있습니다.

### 방법 1: Blueprint 자동 배포
1. GitHub 저장소에 프로젝트를 푸시합니다.
2. [Render Dashboard](https://dashboard.render.com/)에서 **New + → Blueprint**를 선택하고 해당 GitHub 저장소를 연결합니다.
3. `render.yaml`이 자동 인식되며 빌드 및 정적 호스팅이 완료됩니다.

### 방법 2: Static Site 수동 생성
Render에서 **New + → Static Site** 선택 시 아래 값을 입력하세요:
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Rewrite Rule** (선택): `/*` → `/index.html` (Rewrite)
