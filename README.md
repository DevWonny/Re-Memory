## Re:Memory

### Description

- 유저가 여행 사진을 여행지 별로 정리하고 스토리처럼 볼수 있는 앨범 프로젝트

### Motivation

- 최근 여행을 다녀오면서 카메라로 사진을 많이 찍었고, 이런 사진들을 보관할 수 있는 사이트를 한번 제작해보자는 동기를 가지고 시작하게 됨.

### Features

- 회원가입 및 로그인
- 사진 업로드 및 앨범 관리
- 사진 확대
- 애니메이션 효과

### Tech Stack

- Frontend : Next.js, Typescript, Tailwind CSS, SCSS, Zustand, Swiper.js, Three.js
- Backend : Supabase
- Hosting : Vercel

### Color Palette

- Background : #0F0F0F
- Sub : #181818
- Border : #2A2A2A
- Text : #EAEAEA
- Point : #E5A134

### 기간

- 시작 : 25년 12월 03일
- 종료 : -

### 페이지 별 설명

- Main : 좌측은 Three.js를 활용해서 Upload 페이지로 이동되도록 구현. 우측은 유저가 저장한 이미지 카테고리들을 표출함. 우측 폴더를 클릭 할 경우 Detail 페이지로 이동되어 저장한 이미지 및 description들을 확인 할 수 있음.

- Detail : 메인 이미지 아래 썸네일 리스트를 구현하고, 해당 리스트에서 유저가 하나의 이미지를 클릭하면 메인 이미지가 해당 이미지를 표출하도록 구현.

- Modify : Detail 페이지에서 수정 버튼 클릭시 이동되는 페이지. description 및 개별 이미지 삭제 및 추가 기능 구현.

- Upload : 유저가 이미지 및 description 등을 입력하여 저장하는 페이지.
